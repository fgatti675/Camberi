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
        'No SOC 2, no ISO 27001, three engineers: client-owned repositories and accounts, access enforced by Postgres row-level security, health data under German regulation since 2019, and the NDA and DPA we will sign.',
    },
    es: {
      title: 'Seguridad — Camberi',
      description:
        'Sin SOC 2 ni ISO 27001, tres ingenieros: repositorios y cuentas del cliente, control de acceso en Postgres con row-level security, datos de salud bajo normativa alemana desde 2019, y el NDA y el encargo de tratamiento que firmamos.',
    },
  },
};
