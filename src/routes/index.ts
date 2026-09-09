import type { ComponentType } from 'react';
import type { Route, PageRoute } from './types';
import { routePathFromLocation } from './paths';

/* ──────────────────────────────────────────────────────────────
   The route table, discovered rather than declared.

   Every `src/pages/<name>/` with a `route.ts` is a page. There is
   no central list to edit and no merge conflict to have when
   several people add pages at the same time.

   Two globs, on purpose:

   - `route.ts` is **eager**. Paths, head copy, draft flags and
     sitemap priorities have to be available all at once — the
     prerender walks every route, and so do the sitemap and
     llms.txt. It is a few hundred bytes per page.

   - `index.tsx` is **lazy**. The component and the page's words are
     the expensive half, and a visitor needs exactly one of them.
     Each becomes its own chunk; the prerendered HTML carries a
     `modulepreload` for the one it needs, so the split costs a
     parallel request rather than a round trip.

   Keep those two properties in mind when adding an import to a
   `route.ts`: whatever it pulls in is downloaded by every visitor
   on every page.
   ────────────────────────────────────────────────────────────── */

const metas = import.meta.glob<{ route?: Route }>('../pages/*/route.ts', {
  eager: true,
});

const pages = import.meta.glob<{ default?: ComponentType }>('../pages/*/index.tsx');

/** `../pages/work-medicalmotion/route.ts` → `work-medicalmotion`. */
function dirOf(file: string): string {
  return file.split('/')[2];
}

const loaders = new Map(Object.entries(pages).map(([file, load]) => [dirOf(file), load]));

/** Every page, drafts included. `pnpm dev` serves these so a draft can be built. */
export const allRoutes: PageRoute[] = Object.entries(metas)
  .map(([file, mod]) => {
    const dir = dirOf(file);
    if (!mod.route) {
      throw new Error(
        `${file} exports no \`route\`. See src/pages/README.md.`
      );
    }
    if (!mod.route.path.startsWith('/') || !mod.route.path.endsWith('/')) {
      throw new Error(
        `${file}: route.path must start and end with a slash — got "${mod.route.path}".`
      );
    }
    const load = loaders.get(dir);
    if (!load) {
      throw new Error(
        `src/pages/${dir}/ has a route.ts but no index.tsx. See src/pages/README.md.`
      );
    }
    return {
      ...mod.route,
      dir,
      load: async () => {
        const page = await load();
        if (!page.default) {
          throw new Error(
            `src/pages/${dir}/index.tsx has no default export. See src/pages/README.md.`
          );
        }
        return page.default;
      },
    };
  })
  /* Home first, then alphabetical, so the sitemap and llms.txt read sensibly. */
  .sort((a, b) =>
    a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)
  );

/* A page whose `route.ts` was forgotten would simply not exist — no error, no
   404 until somebody followed a link to it. Say so at the point the mistake
   is cheapest to fix. */
for (const dir of loaders.keys()) {
  if (!allRoutes.some((r) => r.dir === dir)) {
    throw new Error(
      `src/pages/${dir}/ has an index.tsx but no route.ts, so it is not a page. See src/pages/README.md.`
    );
  }
}

/** The pages that actually ship. */
export const routes: PageRoute[] = allRoutes.filter((r) => !r.draft);

export function findRoute(pathname: string): PageRoute | undefined {
  const path = routePathFromLocation(pathname);
  return allRoutes.find((r) => r.path === path);
}

export { localePath, routeUrl, routePathFromLocation } from './paths';
export type { Route, RouteMeta, PageRoute } from './types';
