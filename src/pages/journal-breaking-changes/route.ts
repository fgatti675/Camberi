import type { Route } from '../../routes/types';
import { breakingChangesMeta } from './meta';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: breakingChangesMeta.path,
  draft: true,
  priority: 0.5,
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
