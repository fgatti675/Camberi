import type { Route } from '../../routes/types';
import { rowLevelSecurityMeta } from './meta';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: rowLevelSecurityMeta.path,
  draft: true,
  priority: 0.5,
  locales: {
    en: {
      title: 'Where we put the access rules, and why it is Postgres — Camberi',
      description:
        'In Rebase, one collection file generates the schema, the API and the row-level security policies. What a rule compiles to, which tables the server refuses to serve, and what the model deliberately does not cover.',
    },
    es: {
      title: 'Dónde ponemos las reglas de acceso, y por qué en Postgres — Camberi',
      description:
        'En Rebase, un solo fichero de colección genera el esquema, la API y las políticas de row-level security. En qué se convierte una regla, qué tablas se niega a servir el servidor y qué deja fuera el modelo a propósito.',
    },
  },
};
