import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import { findRoute } from './routes';
import { locale } from './i18n';
import { ConsentBar } from './components/ConsentBar';

/* ──────────────────────────────────────────────────────────────
   The client half.

   Every page is prerendered to real HTML, so in production this
   hydrates markup that is already on screen. Links between pages
   are ordinary links and cause ordinary navigations — there is no
   router, because a studio site of a dozen documents does not need
   one and a full load costs less than the machinery would.

   What this file does have is one `await`: the page's component
   lives in its own chunk and has to arrive before React can
   hydrate. There is no fallback and no spinner, because there is
   nothing to fall back to — the finished page is already painted,
   and rendering anything else in the meantime would replace it with
   something worse. The prerendered `<head>` carries a
   `modulepreload` for that chunk, so it is in flight alongside this
   one rather than after it.

   In `pnpm dev` the shell arrives empty and this mounts instead.
   ────────────────────────────────────────────────────────────── */

const container = document.getElementById('root');
const route = container ? findRoute(window.location.pathname) : undefined;

if (container && route) {
  if (import.meta.env.DEV) {
    /* The dev shell has no generated head — give the tab its real title
       so a page under construction is identifiable. */
    document.title = route.locales[locale].title;
    document.documentElement.lang = locale;
  }

  route.load().then((Page) => {
    /* The consent bar is a sibling of the page rather than part of any layout:
       it belongs to the document, not to a route, and it renders nothing at all
       until an effect has read storage — which is what keeps it out of the
       prerendered HTML and out of the way of hydration.

       It goes *before* the page, not after. The bar is `position: fixed`, so
       the order changes nothing on screen; what it changes is the tab order.
       Last in the DOM meant a keyboard visitor had to pass every link on the
       home page before reaching Accept — the two controls the page is asking
       them to use are now the first stops. */
    const tree = (
      <StrictMode>
        <ConsentBar />
        <Page />
      </StrictMode>
    );

    if (container.firstChild) hydrateRoot(container, tree);
    else createRoot(container).render(tree);
  });
}
