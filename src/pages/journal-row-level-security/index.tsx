import type { Route } from '../../routes/types';
import { Article } from '../journal/post';
import { pick } from '../journal/locale';
import { rowLevelSecurityMeta } from './meta';
import { rowLevelSecurityEn } from './copy.en';
import { rowLevelSecurityEs } from './copy.es';

/* Draft until Francesco has read the REVIEW block at the top of `copy.en.ts`.
   The first item there is the one that decides whether this page ships at
   all: rebase.pro already carries a post making the same argument. */

export function RowLevelSecurity() {
  return <Article copy={pick(rowLevelSecurityEn, rowLevelSecurityEs)} meta={rowLevelSecurityMeta} />;
}

export const route: Route = {
  path: rowLevelSecurityMeta.path,
  draft: true,
  priority: 0.5,
  component: RowLevelSecurity,
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
