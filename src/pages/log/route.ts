import type { Route } from '../../routes/types';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: '/log/',
  priority: 0.5,
  locales: {
    en: {
      title: 'Log — Camberi',
      description:
        'A dated record of what we shipped: FireCMS, Rebase and Neat releases, and changes to this site, each linking to the release, commit or page where you can check it.',
    },
    es: {
      title: 'Registro — Camberi',
      description:
        'Un registro con fechas de lo que hemos publicado: releases de FireCMS, Rebase y Neat, y cambios en esta web, con un enlace a la release, el commit o la página donde comprobarlo.',
    },
  },
};
