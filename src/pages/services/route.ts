import type { Route } from '../../routes/types';
import { SERVICES_INDEX } from './service';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: SERVICES_INDEX,
  priority: 0.9,
  locales: {
    en: {
      title: 'Services: automation, product, data, architecture — Camberi',
      description:
        'Four engagements with a fixed scope: automation and AI for operations, product engineering to production, a Postgres data platform, an architecture review.',
      ogTitle: 'Four ways in, each with a fixed scope and an end date',
    },
    es: {
      title: 'Automatización, producto, datos y arquitectura — Camberi',
      description:
        'Cuatro encargos con alcance cerrado: automatización e IA, ingeniería de producto hasta producción, datos en Postgres y revisión de arquitectura.',
      ogTitle: 'Cuatro formas de empezar, todas con alcance cerrado y fecha de fin',
    },
  },
};
