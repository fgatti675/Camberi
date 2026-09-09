import type { Route } from '../../routes/types';
import { Article } from '../journal/post';
import { pick } from '../journal/locale';
import { breakingChangesMeta } from './meta';
import { breakingChangesEn } from './copy.en';
import { breakingChangesEs } from './copy.es';

/* A journal post. Draft until Francesco has read the REVIEW block at the top
   of `copy.en.ts` — `draft: true` means `pnpm dev` serves the page while
   `pnpm build` neither renders it nor lists it in the sitemap or llms.txt.
   Publishing it is one line: delete the flag. */

export function BreakingChanges() {
  return <Article copy={pick(breakingChangesEn, breakingChangesEs)} meta={breakingChangesMeta} />;
}

export const route: Route = {
  path: breakingChangesMeta.path,
  draft: true,
  priority: 0.5,
  component: BreakingChanges,
  locales: {
    en: {
      title: 'Shipping breaking changes to installs we cannot see — Camberi',
      description:
        'How we move FireCMS forward without breaking the projects running it: additive and optional parameters, cache keys that survive an upgrade, and a parallel prerelease line for the Tailwind 4 port.',
    },
    es: {
      title: 'Cambios que rompen, en instalaciones que no vemos — Camberi',
      description:
        'Cómo avanzamos con FireCMS sin romper los proyectos que lo usan: parámetros aditivos y opcionales, claves de caché que sobreviven a una actualización y una línea de preversiones aparte para el salto a Tailwind 4.',
    },
  },
};
