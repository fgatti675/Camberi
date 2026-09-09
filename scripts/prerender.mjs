/* ──────────────────────────────────────────────────────────────
   Prerender.

   Every route ships as a real HTML file with its content already in
   it — `dist/legal/index.html`, `dist/es/legal/index.html` — and the
   client bundle hydrates that markup instead of building it. A
   crawler, a preview card fetcher and a reader with JavaScript off
   all get the same page.

   Run as `node scripts/prerender.mjs`, which is the orchestrator, or
   as `node scripts/prerender.mjs <locale>`, which is one worker. The
   split exists because the locale is decided once, at module load, by
   `src/i18n/index.ts` — that is what lets every component keep
   importing `t` as a plain object with no provider around it. One
   process per language is the price, and it is a cheap one.

   Also emits, from the same route list: sitemap.xml with hreflang
   alternates, llms.txt, and a plain-text .md twin of each page.
   ────────────────────────────────────────────────────────────── */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const DIST = join(ROOT, 'dist');
const SSR_DIR = join(ROOT, 'dist-ssr');
const LOCALES = ['en', 'es'];

function ssrEntry() {
  if (!existsSync(SSR_DIR)) {
    throw new Error('dist-ssr is missing — run the SSR build before prerendering.');
  }
  const file = readdirSync(SSR_DIR).find((f) => /^entry-server.*\.(m?js)$/.test(f));
  if (!file) throw new Error(`No entry-server bundle in ${SSR_DIR}.`);
  return join(SSR_DIR, file);
}

/* ── Asset tags ───────────────────────────────────────────────
   Vite writes the hashed script and stylesheet into its own
   `dist/index.html`. Lifting them out of that file rather than
   reading the manifest means we ship exactly what Vite decided to
   ship, modulepreloads included. Read before the workers start,
   because the home page's worker overwrites this file. */
function readAssets() {
  const html = readFileSync(join(DIST, 'index.html'), 'utf8');
  const head = [
    ...(html.match(/<link[^>]+rel="(?:stylesheet|modulepreload)"[^>]*>/g) ?? []),
  ].join('\n    ');
  const body = (html.match(/<script[^>]*type="module"[^>]*><\/script>/g) ?? []).join('\n    ');
  if (!body) {
    throw new Error('No module script found in dist/index.html — did the client build run?');
  }
  return { head, body };
}

/* ── The route's own chunk ────────────────────────────────────
   A page's component and words are a lazy import, so they are not
   in the entry Vite lists above: the browser would only discover
   them after running it, which is a second round trip on a page
   whose HTML is already complete. The manifest says which hashed
   chunk `src/pages/<dir>/index.tsx` became, and this preloads that
   chunk and anything it imports that the entry does not already
   pull in — so the page's JavaScript travels with the entry's.

   `build.manifest` in `vite.config.ts` is what writes the file. */
function readManifest() {
  const file = join(DIST, '.vite', 'manifest.json');
  if (!existsSync(file)) {
    throw new Error(`${file} is missing — build.manifest must stay on in vite.config.ts.`);
  }
  return JSON.parse(readFileSync(file, 'utf8'));
}

/** The asset files the entry already fetches, so nothing is preloaded twice. */
function alreadyLoaded(assets) {
  const hrefs = [...assets.head.matchAll(/href="\/([^"]+)"/g)].map((m) => m[1]);
  const srcs = [...assets.body.matchAll(/src="\/([^"]+)"/g)].map((m) => m[1]);
  return new Set([...hrefs, ...srcs]);
}

function routePreloads(manifest, dir, already) {
  const key = `src/pages/${dir}/index.tsx`;
  if (!manifest[key]) {
    throw new Error(`No client chunk for ${key} — is the page in the route glob?`);
  }
  const seen = new Set(already);
  const tags = [];
  const walk = (id) => {
    const node = manifest[id];
    if (!node || seen.has(node.file)) return;
    seen.add(node.file);
    tags.push(`<link rel="modulepreload" crossorigin href="/${node.file}" />`);
    for (const css of node.css ?? []) {
      if (seen.has(css)) continue;
      seen.add(css);
      tags.push(`<link rel="stylesheet" crossorigin href="/${css}" />`);
    }
    for (const imported of node.imports ?? []) walk(imported);
  };
  walk(key);
  return tags;
}

function write(file, contents) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents);
}

/** `/legal/` in Spanish is `/es/legal/`; `/` is `/es/`. */
function localePath(locale, path) {
  return locale === 'es' ? `/es${path}` : path;
}

function outFile(locale, path, name) {
  return join(DIST, localePath(locale, path).replace(/^\//, ''), name);
}

/* ── Plain-text twin ──────────────────────────────────────────
   A `.md` beside each `index.html`, built from the page's own
   `<main>`. Language models and the growing number of agents that
   fetch a URL do better with the words than with a React app, and
   it costs one pass over a string we already have. */
const ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x27;': "'",
  '&nbsp;': ' ',
};

function htmlToText(html) {
  let s = html;
  /* Nothing inside these is prose. */
  s = s.replace(/<(script|style|svg|canvas|noscript)\b[\s\S]*?<\/\1>/gi, ' ');
  /* Headings and list items keep their structure. */
  for (const level of [1, 2, 3, 4]) {
    s = s.replace(new RegExp(`<h${level}\\b[^>]*>`, 'gi'), `\n\n${'#'.repeat(level)} `);
    s = s.replace(new RegExp(`</h${level}>`, 'gi'), '\n');
  }
  s = s.replace(/<li\b[^>]*>/gi, '\n- ');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  /* A definition list reads as `- Label: value` rather than as two orphan lines. */
  s = s.replace(/<dt\b[^>]*>/gi, '\n- ').replace(/<\/dt>/gi, ': ');
  s = s.replace(/<dd\b[^>]*>/gi, '').replace(/<\/dd>/gi, '\n');
  /* Block boundaries become line breaks; everything else becomes a space, so
     two spans that split a sentence do not fuse their words together. */
  s = s.replace(/<\/?(p|div|section|article|header|footer|ul|ol|dl|dt|dd|tr|table|main|figure|figcaption|blockquote|nav)\b[^>]*>/gi, '\n');
  s = s.replace(/<[^>]+>/g, ' ');
  s = s.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
  for (const [entity, char] of Object.entries(ENTITIES)) s = s.split(entity).join(char);
  s = s
    .split('\n')
    .map((line) =>
      line
        .replace(/[ \t ]+/g, ' ')
        /* An inline element sitting between a word and the punctuation that
           follows it left a space where there was none: `…in 2017</a>, and…`
           came out as "in 2017 , and", because every tag became a separator.
           Put the punctuation back against the word it belongs to. */
        .replace(/ +([,.;:!?%)\]}»›…])/g, '$1')
        .replace(/([(\[{«‹¿¡]) +/g, '$1')
        .trim()
    )
    .join('\n');
  return s.replace(/\n{3,}/g, '\n\n').trim();
}

function markdownFor(route, locale, html, origin) {
  const meta = route.locales[locale];
  const main = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/i);
  const body = htmlToText(main ? main[1] : html);
  return `# ${meta.title}\n\n> ${meta.description}\n\n<${origin}${localePath(locale, route.path)}>\n\n---\n\n${body}\n`;
}

/* ── Worker: one language, every page ─────────────────────────── */
async function renderLocale(locale) {
  if (!LOCALES.includes(locale)) throw new Error(`Unknown locale "${locale}".`);
  /* Set before the import, never after: `src/i18n/index.ts` reads it once at
     module load, which is exactly what keeps `t` a constant. */
  globalThis.__CAMBERI_LOCALE__ = locale;

  const assets = JSON.parse(process.env.CAMBERI_ASSETS ?? '{}');
  const manifest = readManifest();
  const shared = alreadyLoaded(assets);
  const mod = await import(pathToFileURL(ssrEntry()).href);

  if (mod.activeLocale !== locale) {
    throw new Error(
      `The SSR bundle rendered as "${mod.activeLocale}" when asked for "${locale}".`
    );
  }

  for (const route of mod.routes) {
    const preloads = routePreloads(manifest, route.dir, shared);
    const html = await mod.renderRoute(route, {
      ...assets,
      head: [assets.head, ...preloads].filter(Boolean).join('\n    '),
    });
    write(outFile(locale, route.path, 'index.html'), html);
    write(outFile(locale, route.path, 'index.md'), markdownFor(route, locale, html, mod.origin));
    process.stdout.write(`  ${localePath(locale, route.path)}\n`);
  }
}

/* ── Sitemap and llms.txt ─────────────────────────────────────── */
function buildSitemap(routes, origin, today) {
  const urls = [];
  for (const route of routes) {
    if (route.noindex) continue;
    const en = origin + route.path;
    const es = `${origin}/es${route.path}`;
    for (const loc of [en, es]) {
      urls.push(
        [
          '  <url>',
          `    <loc>${loc}</loc>`,
          `    <xhtml:link rel="alternate" hreflang="en" href="${en}" />`,
          `    <xhtml:link rel="alternate" hreflang="es" href="${es}" />`,
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />`,
          route.priority ? `    <priority>${route.priority}</priority>` : null,
          `    <lastmod>${today}</lastmod>`,
          '  </url>',
        ]
          .filter(Boolean)
          .join('\n')
      );
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

function buildLlmsTxt(routes, origin) {
  const home = routes.find((r) => r.path === '/');
  const listed = routes.filter((r) => !r.noindex);
  const line = (route, locale) =>
    `- [${route.locales[locale].title}](${origin}${localePath(locale, route.path)}): ${
      route.locales[locale].description
    }`;

  return [
    '# Camberi',
    '',
    `> ${home ? home.locales.en.description : ''}`,
    '',
    'Camberi is the trade name of FireCMS S.L., a company registered in Madrid, Spain.',
    'The studio builds and runs its own software — FireCMS, Rebase, Neat, Dadaki, Unbrand —',
    'and the technology behind medicalmotion and SustenTalent.',
    '',
    'Every page below is also available as plain text at the same URL with `index.md` appended.',
    '',
    '## Pages',
    '',
    ...listed.map((r) => line(r, 'en')),
    '',
    '## Páginas (español)',
    '',
    ...listed.map((r) => line(r, 'es')),
    '',
  ].join('\n');
}

/* ── Orchestrator ─────────────────────────────────────────────── */
async function main() {
  const assets = readAssets();
  const today = new Date().toISOString().slice(0, 10);

  for (const locale of LOCALES) {
    process.stdout.write(`prerender ${locale}\n`);
    const result = spawnSync(process.execPath, [fileURLToPath(import.meta.url), locale], {
      stdio: 'inherit',
      env: { ...process.env, CAMBERI_ASSETS: JSON.stringify(assets) },
    });
    if (result.status !== 0) process.exit(result.status ?? 1);
  }

  const mod = await import(pathToFileURL(ssrEntry()).href);
  write(join(DIST, 'sitemap.xml'), buildSitemap(mod.routes, mod.origin, today));
  write(join(DIST, 'llms.txt'), buildLlmsTxt(mod.routes, mod.origin));
  process.stdout.write(`  sitemap.xml, llms.txt (${mod.routes.length} routes × 2 languages)\n`);
}

const arg = process.argv[2];
await (arg ? renderLocale(arg) : main());
