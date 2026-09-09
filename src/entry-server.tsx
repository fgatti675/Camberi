import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { routes } from './routes';
import type { Route } from './routes/types';
import { buildHead } from './routes/head';
import { locale } from './i18n';
import { SITE } from './site';

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
  const app = renderToString(
    <StrictMode>
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
