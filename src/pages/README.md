# Adding a page

Every page is a directory here. Adding one touches **no shared file** — not
`vite.config.ts`, not `src/i18n/en.ts`, not a route list. The build finds the
page, prerenders it in both languages, and adds it to the sitemap and
`llms.txt`.

```
src/pages/<name>/
  index.tsx     the component and the `route` export
  copy.en.ts    the page's English words
  copy.es.ts    the page's Spanish words, typed against copy.en.ts
```

Read `src/pages/legal/` — it is the worked example for all of this.

## 1. `index.tsx`

```tsx
import { PageLayout, PageHead, Prose } from '../../components/PageLayout';
import { CONTAINER } from '../../components/ui';
import { locale } from '../../i18n';
import type { Route } from '../../routes/types';
import { securityEn, type SecurityCopy } from './copy.en';
import { securityEs } from './copy.es';

const copy: SecurityCopy = locale === 'es' ? securityEs : securityEn;

export function Security() {
  return (
    <PageLayout>
      <PageHead title={copy.title} intro={copy.intro} />
      <div className={`${CONTAINER} pb-28 md:pb-36`}>
        <Prose paragraphs={copy.body} />
      </div>
    </PageLayout>
  );
}

export const route: Route = {
  path: '/security/',
  component: Security,
  locales: {
    en: { title: 'Security — Camberi', description: '…' },
    es: { title: 'Seguridad — Camberi', description: '…' },
  },
};
```

That `route` export is the whole contract. Its type is in
`src/routes/types.ts`:

| field       | required | notes |
| ----------- | -------- | ----- |
| `path`      | yes | The **English** URL. Leading *and* trailing slash. The Spanish URL is the same path under `/es/` — you never declare it, and that is what keeps hreflang correct for free. |
| `locales`   | yes | `{ en, es }`, each `{ title, description, ogTitle?, ogDescription? }`. Both languages or the build fails. |
| `component` | yes | Reads its locale from `import { t }` / `import { locale }` like everything else. |
| `priority`  | no  | Sitemap priority, 0–1. Home is 1, `/legal/` is 0.3. |
| `draft`     | no  | `true` while you work: served by `pnpm dev`, never built, never listed. |
| `noindex`   | no  | Built and reachable, but excluded from the index, the sitemap and `llms.txt`. |

## 2. Copy

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

## 3. Prose, links and facts

`Prose` (in `src/components/PageLayout.tsx`) renders an array of strings as
paragraphs and understands two things inside them:

- `[label](href)` — an inline link. External ones get `target="_blank"`.
- `__TOKEN__` — replaced by a value you pass as `vars`.

Facts — company name, NIF, addresses, emails, social URLs, the booking link —
come from **`src/site.ts`** and are passed in as `vars`. Never type a fact into
copy: it would then need correcting in two languages and every page that
mentions it. An unverified fact is `TODO_FRANCESCO` in `site.ts`, which is
`null`, and consumers must skip it rather than print a placeholder.

## 4. Layout

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

## 5. Server-side rendering

Every page is rendered to HTML by Node at build time and hydrated in the
browser, so:

- `window`, `document`, `location`, `localStorage`, `IntersectionObserver`,
  `matchMedia` and `devicePixelRatio` are only available **inside effects**.
- Anything read during render must produce the same result on the server and
  on the client's first render, or hydration breaks. If you need a
  browser-only value, start from a neutral default and set it in an effect.
- Links between pages are ordinary `<a href>`. There is no router.

## 6. Checking your work

```
pnpm dev                # any route, any language, hot reload
pnpm build && pnpm preview
```

Dev serves the shell in `index.html`, which has no generated head — that is
expected. To see the real `<title>`, canonical, hreflang and JSON-LD, build and
preview, then look at `dist/<path>/index.html`.

Before you finish: `pnpm build` and `pnpm lint` clean, the page present at both
`dist/<path>/index.html` and `dist/es/<path>/index.html`, and no hydration
errors in the browser console.
