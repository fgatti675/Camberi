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
      title: 'Services: AI agents, product engineering, data — Camberi',
      description:
        'Three engagements with a fixed scope: AI agents and automation for operations, product engineering to production, and a Postgres data platform.',
      ogTitle: 'Three ways in, each with a fixed scope and an end date',
    },
    es: {
      title: 'Agentes de IA, producto y datos en Postgres — Camberi',
      description:
        'Tres encargos con alcance cerrado: agentes de IA y automatización, ingeniería de producto hasta producción y una plataforma de datos en Postgres.',
      ogTitle: 'Tres formas de empezar, todas con alcance cerrado y fecha de fin',
    },
  },
};
