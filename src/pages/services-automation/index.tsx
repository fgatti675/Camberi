import { locale } from '../../i18n';
import type { Route } from '../../routes/types';
import { ServicePage } from '../services/ServicePage';
import { SERVICE_PATHS, type ServiceCopy } from '../services/service';
import { automationEn } from './copy.en';
import { automationEs } from './copy.es';

/* The engagement's own page. It used to be the first anchor in the
   home page's engagement list, which meant one URL had to rank for
   automation, product engineering, Postgres and architecture review
   at once.

   The directory is flat — `services-automation`, not
   `services/automation` — because the page glob in
   `src/routes/index.ts` only looks one level deep for an
   `index.tsx`. The URL is what nests, not the folder. */

const copy: ServiceCopy = locale === 'es' ? automationEs : automationEn;

export function ServicesAutomation() {
  return <ServicePage copy={copy} path={SERVICE_PATHS[0]} />;
}

export const route: Route = {
  path: SERVICE_PATHS[0],
  priority: 0.8,
  component: ServicesAutomation,
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
