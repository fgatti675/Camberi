import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { routes } from './routes';
import type { Route } from './routes/types';
import { buildHead } from './routes/head';
import { locale } from './i18n';
import { SITE } from './site';
import { ConsentBar } from './components/ConsentBar';

/* ──────────────────────────────────────────────────────────────
   The server half of the build.

   `scripts/prerender.mjs` sets `globalThis.__CAMBERI_LOCALE__`,
   imports this module, and asks for one document per route. Because
   the locale is fixed before the first import, `t` stays the plain
   object every component already imports — there is no provider and
   no second code path for the server.
   ────────────────────────────────────────────────────────────── */

export { routes };
export const activeLocale = locale;
export const origin = SITE.origin;

/** The tags Vite generated for the client bundle, lifted out of its own HTML. */
export interface Assets {
  /** Stylesheets and module preloads — go in `<head>`. */
  head: string;
  /** The module script — goes at the end of `<body>`. */
  body: string;
}

export function renderRoute(route: Route, assets: Assets): string {
  const Page = route.component;
  /* `ConsentBar` renders null here — it has no browser storage to read and
     nothing it could honestly say. It is in the tree all the same, so the
     server and the client agree on the shape of the root and hydration has
     nothing to reconcile. It sits before the page for the same reason it does
     in `main.tsx`: the bar is fixed, so this is a tab-order decision only. */
  const app = renderToString(
    <StrictMode>
      <ConsentBar />
      <Page />
    </StrictMode>
  );
  const head = buildHead(route, locale);

  return `<!doctype html>
<html lang="${locale}">
  <head>
    ${head}
    ${assets.head}
  </head>
  <body>
    <div id="root">${app}</div>
    ${assets.body}
  </body>
</html>
`;
}
