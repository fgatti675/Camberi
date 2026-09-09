import type { Route } from '../../routes/types';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: '/journal/',
  draft: true,
  priority: 0.5,
  locales: {
    en: {
      title: 'Journal — Camberi',
      description:
        'Notes on decisions in our own code: how FireCMS ships breaking changes across installations we cannot see, and why Rebase puts its access rules in Postgres.',
    },
    es: {
      title: 'Cuaderno — Camberi',
      description:
        'Apuntes sobre decisiones de nuestro propio código: cómo publica FireCMS cambios que rompen en instalaciones que no vemos, y por qué Rebase pone sus reglas de acceso en Postgres.',
    },
  },
};
