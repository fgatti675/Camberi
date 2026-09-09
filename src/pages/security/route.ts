import type { Route } from '../../routes/types';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: '/security/',
  priority: 0.4,
  locales: {
    en: {
      title: 'Security — Camberi',
      description:
        'No SOC 2, no ISO 27001, three engineers: repositories and accounts you own, access enforced in Postgres, health data under German rules since 2019.',
    },
    es: {
      title: 'Seguridad — Camberi',
      description:
        'Sin SOC 2 ni ISO 27001, tres ingenieros: repositorios y cuentas tuyos, permisos en Postgres y datos de salud bajo normativa alemana desde 2019.',
    },
  },
};
