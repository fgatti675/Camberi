import type { Route } from '../../routes/types';
import { SERVICE_PATHS } from '../services/service';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: SERVICE_PATHS[0],
  priority: 0.8,
  locales: {
    en: {
      title: 'Automation and AI for operations teams — Camberi',
      description:
        'We automate the spreadsheets, reports and approvals your team redoes by hand — LLM features included, with evaluation, cost control and a defined fallback.',
      ogTitle: 'The work your team redoes every week, done by software instead',
    },
    es: {
      title: 'Automatización e IA para equipos de operaciones — Camberi',
      description:
        'Automatizamos el Excel, el informe y la aprobación que tu equipo repite a mano. También funciones con LLM, con evaluación, control de coste y plan B.',
      ogTitle: 'Que el software haga el trabajo que tu equipo repite cada semana',
    },
  },
};
