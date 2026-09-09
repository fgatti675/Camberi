import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import { findRoute } from './routes';
import { locale } from './i18n';

/* ──────────────────────────────────────────────────────────────
   The client half.

   Every page is prerendered to real HTML, so in production this
   hydrates markup that is already on screen. Links between pages
   are ordinary links and cause ordinary navigations — there is no
   router, because a studio site of a dozen documents does not need
   one and a full load costs less than the machinery would.

   In `pnpm dev` the shell arrives empty and this mounts instead.
   ────────────────────────────────────────────────────────────── */

const container = document.getElementById('root');
const route = container ? findRoute(window.location.pathname) : undefined;

if (container && route) {
  const Page = route.component;
  const tree = (
    <StrictMode>
      <Page />
    </StrictMode>
  );

  if (import.meta.env.DEV) {
    /* The dev shell has no generated head — give the tab its real title
       so a page under construction is identifiable. */
    document.title = route.locales[locale].title;
    document.documentElement.lang = locale;
  }

  if (container.firstChild) hydrateRoot(container, tree);
  else createRoot(container).render(tree);
}
