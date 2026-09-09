import type { Route } from './types';
import { routePathFromLocation } from './paths';

/* ──────────────────────────────────────────────────────────────
   The route table, discovered rather than declared.

   Every `src/pages/<name>/index.tsx` that exports a `route` is a
   page. There is no central list to edit and no merge conflict to
   have when several people add pages at the same time.
   ────────────────────────────────────────────────────────────── */

const modules = import.meta.glob<{ route?: Route }>('../pages/*/index.tsx', {
  eager: true,
});

/** Every page, drafts included. `pnpm dev` serves these so a draft can be built. */
export const allRoutes: Route[] = Object.entries(modules)
  .map(([file, mod]) => {
    if (!mod.route) {
      throw new Error(
        `${file} is in src/pages but exports no \`route\`. See src/pages/README.md.`
      );
    }
    if (!mod.route.path.startsWith('/') || !mod.route.path.endsWith('/')) {
      throw new Error(
        `${file}: route.path must start and end with a slash — got "${mod.route.path}".`
      );
    }
    return mod.route;
  })
  /* Home first, then alphabetical, so the sitemap and llms.txt read sensibly. */
  .sort((a, b) =>
    a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)
  );

/** The pages that actually ship. */
export const routes: Route[] = allRoutes.filter((r) => !r.draft);

export function findRoute(pathname: string): Route | undefined {
  const path = routePathFromLocation(pathname);
  return allRoutes.find((r) => r.path === path);
}

export { localePath, routeUrl, routePathFromLocation } from './paths';
export type { Route, RouteMeta } from './types';
