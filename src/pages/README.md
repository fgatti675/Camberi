# Adding a page

Every page is a directory here. Adding one touches **no shared file** — not
`vite.config.ts`, not `src/i18n/en.ts`, not a route list. The build finds the
page, prerenders it in both languages, and adds it to the sitemap and
`llms.txt`.

```
src/pages/<name>/
  route.ts      the URL and the <head> copy — metadata only
  index.tsx     the component, as the default export
  copy.en.ts    the page's English words
  copy.es.ts    the page's Spanish words, typed against copy.en.ts
```

Read `src/pages/legal/` — it is the worked example for all of this.

**Why two files.** `route.ts` is imported eagerly, because the prerender, the
sitemap and `llms.txt` need every page's path and head copy at once;
`index.tsx` is imported lazily, so a visitor downloads one page's component
and words rather than twelve. Bundling the site together cost every visitor
about 200 KB of pages they were not reading. Keep `route.ts` metadata-only:
whatever it imports is downloaded by everyone, on every page.

## 1. `route.ts`

```ts
import type { Route } from '../../routes/types';

export const route: Route = {
  path: '/security/',
  locales: {
    en: { title: 'Security — Camberi', description: '…' },
    es: { title: 'Seguridad — Camberi', description: '…' },
  },
};
```

That `route` export is half the contract. Its type is in
`src/routes/types.ts`:

| field       | required | notes |
| ----------- | -------- | ----- |
| `path`      | yes | The **English** URL. Leading *and* trailing slash. The Spanish URL is the same path under `/es/` — you never declare it, and that is what keeps hreflang correct for free. |
| `locales`   | yes | `{ en, es }`, each `{ title, description, ogTitle?, ogDescription? }`. Both languages or the build fails. A `title` is at most 60 characters and a `description` at most 155, or Google writes its own. |
| `priority`  | no  | Sitemap priority, 0–1. Home is 1, `/legal/` is 0.3. |
| `draft`     | no  | `true` while you work: served by `pnpm dev`, never built, never listed. |
| `noindex`   | no  | Built and reachable, but excluded from the index, the sitemap and `llms.txt`. |

## 2. `index.tsx`

The other half is the component, as the **default export**: the route table
imports `index.tsx` and takes its `default`. A page with a `route.ts` and no
`index.tsx`, or an `index.tsx` with no default export, fails loudly at
startup rather than 404ing later.

```tsx
import { PageLayout, PageHead, Prose } from '../../components/PageLayout';
import { CONTAINER } from '../../components/ui';
import { locale } from '../../i18n';
import { securityEn, type SecurityCopy } from './copy.en';
import { securityEs } from './copy.es';

const copy: SecurityCopy = locale === 'es' ? securityEs : securityEn;

export default function Security() {
  return (
    <PageLayout>
      <PageHead title={copy.title} intro={copy.intro} />
      <div className={`${CONTAINER} pb-28 md:pb-36`}>
        <Prose paragraphs={copy.body} />
      </div>
    </PageLayout>
  );
}
```

This file becomes the page's own chunk. The prerendered HTML carries a
`<link rel="modulepreload">` for it, so it is fetched alongside the main
bundle rather than after it and there is no flash while it arrives — the
finished page is already on screen, and hydration waits for the chunk rather
than rendering a placeholder over it. Nothing to configure: the preload is
generated from Vite's manifest by `scripts/prerender.mjs`.

## 3. Copy

Page copy lives with the page, **never** in `src/i18n/en.ts`. That file is only
for chrome every page shares — nav labels, footer columns. Keeping page copy
here means five people can add five pages without touching the same file.

`copy.en.ts` is the source of truth and exports its own type:

```ts
export const securityEn = {
  title: 'Security',
  intro: '…',
  body: ['First paragraph.', 'Second paragraph.'],
};

export type SecurityCopy = typeof securityEn;
```

`copy.es.ts` is typed against it, so a missing or misspelled key fails the
build instead of silently rendering English:

```ts
import type { SecurityCopy } from './copy.en';

export const securityEs: SecurityCopy = { … };
```

**Write the Spanish as Spanish.** It is not a translation of the English —
keep the argument and the key structure identical (the types and the layout
depend on that), and write each sentence the way a Castilian speaker would.
Register is tuteo for marketing pages; legal and policy pages are impersonal.
Product and stack names stay in English.

## 4. Prose, links and facts

`Prose` (in `src/components/PageLayout.tsx`) renders an array of strings as
paragraphs and understands two things inside them:

- `[label](href)` — an inline link. External ones get `target="_blank"`.
- `__TOKEN__` — replaced by a value you pass as `vars`.

Facts — company name, NIF, addresses, emails, social URLs, the booking link —
come from **`src/site.ts`** and are passed in as `vars`. Never type a fact into
copy: it would then need correcting in two languages and every page that
mentions it. An unverified fact is `TODO_FRANCESCO` in `site.ts`, which is
`null`, and consumers must skip it rather than print a placeholder.

## 5. Layout

- `PageLayout` gives you the header in its light state (there is no hero on an
  inner page), a `<main>`, and the footer. It also starts the entrance
  animations. The scroll spine is deliberately absent — it is a running head
  for the home page's sections.
- `PageHead` is the masthead: a rule, the page's `h1` in the display serif, an
  optional standfirst beside it, and an optional line of mono small print.
- Everything else composes `CONTAINER`, `SECTION`, `Rule`, `SectionHead`,
  `Evidence`, `Tag`, `Button` from `src/components/ui.tsx`. Use those rather
  than bespoke inline styles, or the page will not read as part of the site.
- **No eyebrow labels.** They were removed from the whole site on purpose.
- Do not restyle the hero or the header.

## 6. Server-side rendering

Every page is rendered to HTML by Node at build time and hydrated in the
browser, so:

- `window`, `document`, `location`, `localStorage`, `IntersectionObserver`,
  `matchMedia` and `devicePixelRatio` are only available **inside effects**.
- Anything read during render must produce the same result on the server and
  on the client's first render, or hydration breaks. If you need a
  browser-only value, start from a neutral default and set it in an effect.
- Links between pages are ordinary `<a href>`. There is no router.

## 7. Checking your work

```
pnpm dev                # any route, any language, hot reload
pnpm build && pnpm preview
```

Dev serves the shell in `index.html`, which has no generated head — that is
expected. To see the real `<title>`, canonical, hreflang and JSON-LD, build and
preview, then look at `dist/<path>/index.html`.

Before you finish: `pnpm build` and `pnpm lint` clean, the page present at both
`dist/<path>/index.html` and `dist/es/<path>/index.html`, no hydration errors
in the browser console, and — in the network panel — the page loading its own
chunk and the shared ones, and no other page's.
