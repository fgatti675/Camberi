import type { Route } from '../../routes/types';
import { SERVICE_PATHS } from '../services/service';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: SERVICE_PATHS[1],
  priority: 0.8,
  locales: {
    en: {
      title: 'Product engineering, zero to production — Camberi',
      description:
        'One team for design, frontend, backend and infrastructure, from zero to production — including regulated products where health data must survive scrutiny.',
      ogTitle: 'From zero to a product in production, including the regulated kind',
    },
    es: {
      title: 'Ingeniería de producto, de cero a producción — Camberi',
      description:
        'Un solo equipo para diseño, frontend, backend e infraestructura, de cero a producción. También productos regulados con datos de salud que pasan auditorías.',
      ogTitle: 'De cero a un producto en producción, también del tipo regulado',
    },
  },
};
