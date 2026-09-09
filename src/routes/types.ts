import type { ComponentType } from 'react';
import type { Locale } from '../i18n';

/* ──────────────────────────────────────────────────────────────
   What a page is.

   A page is a directory under `src/pages/` with two files that the
   build cares about: a `route.ts` that says where the page lives
   and what its `<head>` says, and an `index.tsx` that default-
   exports the component. Nothing else has to be edited to add one —
   the build discovers them, prerenders each into real HTML, and
   lists them in the sitemap and llms.txt.

   The split between the two files is the whole point of this
   module. Route metadata is imported eagerly, because the sitemap,
   llms.txt and the prerender need every page's path and head copy
   at once; the component and its words are imported lazily, so a
   visitor downloads one page rather than twelve.

   See `src/pages/README.md` for the whole recipe.
   ────────────────────────────────────────────────────────────── */

/** The head copy for one language. Everything here ends up in `<head>`. */
export interface RouteMeta {
  /** `<title>`. At most 60 characters, or Google truncates it. */
  title: string;
  /** `<meta name="description">`. At most 155 characters. */
  description: string;
  /** Falls back to `title` when omitted. */
  ogTitle?: string;
  /** Falls back to `description` when omitted. */
  ogDescription?: string;
}

/**
 * What `src/pages/<name>/route.ts` exports. Metadata only: this module ends
 * up in the main bundle of every page, so anything it imports is downloaded
 * by everyone. The component is not here — it is the default export of
 * `index.tsx`, which the route table loads on demand.
 */
export interface Route {
  /**
   * The English URL, with a leading and a trailing slash: `/`,
   * `/work/medicalmotion/`. The Spanish URL is the same path under
   * `/es/`, which is what keeps hreflang a one-liner.
   */
  path: string;
  /** Head copy per language. Both are required — a page ships in both or not at all. */
  locales: Record<Locale, RouteMeta>;
  /** Sitemap priority, 0–1. Defaults to 1.0 for `/` and 0.6 for everything else. */
  priority?: number;
  /** Work in progress: served by `pnpm dev`, never built, never listed. */
  draft?: boolean;
  /** Built and reachable, but kept out of the index, the sitemap and llms.txt. */
  noindex?: boolean;
}

/**
 * A route as the rest of the app sees it: the metadata the page declared,
 * plus the two things discovery adds — the directory it came from and the
 * loader for its chunk.
 */
export interface PageRoute extends Route {
  /** The page's directory name under `src/pages/`, e.g. `work-medicalmotion`. */
  dir: string;
  /** Imports `index.tsx`, i.e. fetches this page's own chunk. */
  load: () => Promise<ComponentType>;
}
