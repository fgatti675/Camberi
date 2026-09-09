/* ──────────────────────────────────────────────────────────────
   Candidates for /log/.

       node scripts/log-candidates.mjs
       node scripts/log-candidates.mjs 2026-08-01   # from a date instead

   Prints the releases and npm publishes that are newer than the
   newest entry in `src/pages/log/entries.ts`, already shaped as
   entries, so refreshing the log is: run this, delete the rows that
   are not worth publishing, write the sentence and its Spanish, and
   commit.

   It is a *separate command on purpose*. The log is committed data,
   not a feed: `pnpm build` never touches the network, so a build in
   a tunnel or in three months' time produces the same bytes. This
   script is the only thing here that talks to GitHub and npm.

   Both APIs are read unauthenticated. GitHub allows 60 requests an
   hour from one address and this makes six, so there is no token to
   manage; if you do hit the limit, set GITHUB_TOKEN and it will be
   sent as a bearer token.
   ────────────────────────────────────────────────────────────── */

import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ENTRIES = join(ROOT, 'src/pages/log/entries.ts');

/* Repositories whose releases are worth reading, and packages whose publish
   dates are the ship date for something that has no release. Both lists are
   needed: FireCMS tags and publishes every version but stopped writing GitHub
   release pages after 3.2.0, so npm is the only place its recent versions
   appear. Add to these rather than to the printing code below. */
const REPOS = ['firecmsco/firecms', 'firecmsco/neat', 'rebasepro/rebase'];
const PACKAGES = ['@firecms/core', '@firecms/neat'];

/** The newest date already committed — everything at or before it is old news. */
function newestCommitted() {
  const source = readFileSync(ENTRIES, 'utf8');
  const dates = [...source.matchAll(/date:\s*'(\d{4}-\d{2}-\d{2})'/g)].map((m) => m[1]);
  if (!dates.length) throw new Error(`No dates found in ${ENTRIES}.`);
  return dates.sort().at(-1);
}

async function json(url) {
  const headers = { 'user-agent': 'camberi-log-candidates', accept: 'application/json' };
  if (process.env.GITHUB_TOKEN && url.includes('api.github.com')) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} — ${url}`);
  return response.json();
}

/* GitHub's `published_at` is when the release *page* was written, which for a
   batch of back-filled releases is all one afternoon. The tag is when the
   thing shipped, so releases are dated by their tag's commit. */
async function releases(repo, since) {
  const list = await json(`https://api.github.com/repos/${repo}/releases?per_page=100`);
  const out = [];
  for (const release of list) {
    if (release.draft) continue;
    const published = (release.published_at ?? '').slice(0, 10);
    /* Cheap filter first: a tag lookup per release would be 55 requests. */
    if (published && published < since) continue;
    let date = published;
    try {
      const tag = await json(
        `https://api.github.com/repos/${repo}/commits/${encodeURIComponent(release.tag_name)}`
      );
      date = (tag.commit?.committer?.date ?? tag.commit?.author?.date ?? '').slice(0, 10) || date;
    } catch {
      /* A release whose tag has gone: keep the published date and say so. */
    }
    if (date > since) out.push({ date, what: release.tag_name, href: release.html_url, source: `github.com/${repo}` });
  }
  return out;
}

async function publishes(pkg, since) {
  const { time } = await json(`https://registry.npmjs.org/${pkg}`);
  return Object.entries(time)
    .filter(([version]) => version !== 'created' && version !== 'modified')
    .filter(([version]) => !/canary|alpha|nightly/.test(version))
    .map(([version, at]) => ({
      date: at.slice(0, 10),
      what: `${pkg}@${version}`,
      href: `https://www.npmjs.com/package/${pkg}`,
      source: `npmjs.com/${pkg}`,
    }))
    .filter((row) => row.date > since);
}

/* An explicit date is accepted so the script can be checked against a window
   whose answer is already known — `node scripts/log-candidates.mjs 2026-08-01`
   should print the entries August and September already carry. */
const since = process.argv[2] ?? newestCommitted();
if (!/^\d{4}-\d{2}-\d{2}$/.test(since)) throw new Error(`Not an ISO date: ${since}`);
const found = [];

for (const repo of REPOS) {
  try {
    found.push(...(await releases(repo, since)));
  } catch (error) {
    console.error(`! ${repo}: ${error.message}`);
  }
}
for (const pkg of PACKAGES) {
  try {
    found.push(...(await publishes(pkg, since)));
  } catch (error) {
    console.error(`! ${pkg}: ${error.message}`);
  }
}

found.sort((a, b) => b.date.localeCompare(a.date) || a.what.localeCompare(b.what));

console.log(`\n// Candidates after ${since} — ${found.length} found.`);
console.log('// Keep the ones worth publishing, write both sentences, paste into entries.ts.\n');

for (const row of found) {
  console.log(`  {
    date: '${row.date}',
    en: '', // ${row.what}
    es: '',
    href: '${row.href}',
    source: '${row.source}',
  },`);
}

if (!found.length) console.log('  // Nothing new. \n');
