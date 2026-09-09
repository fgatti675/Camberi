import { locale } from '../../i18n';
import type { Route } from '../../routes/types';
import { ServicePage } from '../services/ServicePage';
import { SERVICE_PATHS, type ServiceCopy } from '../services/service';
import { architectureReviewEn } from './copy.en';
import { architectureReviewEs } from './copy.es';

const copy: ServiceCopy = locale === 'es' ? architectureReviewEs : architectureReviewEn;

export function ServicesArchitectureReview() {
  return <ServicePage copy={copy} path={SERVICE_PATHS[3]} />;
}

export const route: Route = {
  path: SERVICE_PATHS[3],
  priority: 0.8,
  component: ServicesArchitectureReview,
  locales: {
    en: {
      title: 'Software architecture review in two weeks — Camberi',
      description:
        'A fixed-scope software architecture review: two weeks reading your stack, then a written plan that ranks findings by cost and that your own team can act on without us.',
      ogTitle: 'Two weeks, and a written plan your own team can act on',
    },
    es: {
      title: 'Revisión de arquitectura de software en dos semanas — Camberi',
      description:
        'Revisión de arquitectura con alcance cerrado: dos semanas leyendo tu stack y un plan por escrito, ordenado por coste, que tu equipo puede ejecutar sin nosotros.',
      ogTitle: 'Dos semanas y un plan por escrito que tu equipo puede ejecutar solo',
    },
  },
};
