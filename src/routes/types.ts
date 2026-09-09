import type { ComponentType } from 'react';
import type { Locale } from '../i18n';

/* ──────────────────────────────────────────────────────────────
   What a page is.

   A page is a directory under `src/pages/` whose `index.tsx`
   exports a `route`. Nothing else has to be edited to add one —
   the build discovers them, prerenders each into real HTML, and
   lists them in the sitemap and llms.txt.

   See `src/pages/README.md` for the whole recipe.
   ────────────────────────────────────────────────────────────── */

/** The head copy for one language. Everything here ends up in `<head>`. */
export interface RouteMeta {
  /** `<title>`. Around 60 characters before Google truncates it. */
  title: string;
  /** `<meta name="description">`. Around 155 characters. */
  description: string;
  /** Falls back to `title` when omitted. */
  ogTitle?: string;
  /** Falls back to `description` when omitted. */
  ogDescription?: string;
}

export interface Route {
  /**
   * The English URL, with a leading and a trailing slash: `/`,
   * `/work/medicalmotion/`. The Spanish URL is the same path under
   * `/es/`, which is what keeps hreflang a one-liner.
   */
  path: string;
  /** Head copy per language. Both are required — a page ships in both or not at all. */
  locales: Record<Locale, RouteMeta>;
  /** The page itself. It reads its locale from `import { t }` like everything else. */
  component: ComponentType;
  /** Sitemap priority, 0–1. Defaults to 1.0 for `/` and 0.6 for everything else. */
  priority?: number;
  /** Work in progress: served by `pnpm dev`, never built, never listed. */
  draft?: boolean;
  /** Built and reachable, but kept out of the index, the sitemap and llms.txt. */
  noindex?: boolean;
}
