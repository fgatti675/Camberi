import type { Route } from '../../routes/types';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: '/work/sustentalent/',
  priority: 0.8,
  locales: {
    en: {
      title: 'SustenTalent — a case study — Camberi',
      description:
        'How a sustainability job board was built so that running it produces its own prospect list: the scrape read by employer, access control enforced by Postgres, and an admin that derives the next step.',
      ogTitle: 'SustenTalent: the same scrape fills the board and the sales pipeline',
    },
    es: {
      title: 'SustenTalent — el caso — Camberi',
      description:
        'Cómo se hizo una bolsa de empleo de sostenibilidad para que mantenerla genere su propia lista de prospectos: el scraping leído por empresa, los permisos en Postgres y un panel que deduce el siguiente paso.',
      ogTitle: 'SustenTalent: el mismo scraping llena la bolsa y el pipeline comercial',
    },
  },
};
