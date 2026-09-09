import type { Route } from '../../routes/types';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: '/legal/',
  priority: 0.3,
  locales: {
    en: {
      title: 'Legal notice — Camberi',
      description:
        'FireCMS S.L., trading as Camberi: registered office, tax and commercial registry details, hosting provider, applicable law and the German Impressum.',
    },
    es: {
      title: 'Aviso legal — Camberi',
      description:
        'FireCMS S.L., que opera como Camberi: domicilio social, datos fiscales y registrales, alojamiento, legislación aplicable y el Impressum alemán.',
    },
  },
};
