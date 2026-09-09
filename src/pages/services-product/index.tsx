import { locale } from '../../i18n';
import type { Route } from '../../routes/types';
import { ServicePage } from '../services/ServicePage';
import { SERVICE_PATHS, type ServiceCopy } from '../services/service';
import { productEn } from './copy.en';
import { productEs } from './copy.es';

const copy: ServiceCopy = locale === 'es' ? productEs : productEn;

export function ServicesProduct() {
  return <ServicePage copy={copy} path={SERVICE_PATHS[1]} />;
}

export const route: Route = {
  path: SERVICE_PATHS[1],
  priority: 0.8,
  component: ServicesProduct,
  locales: {
    en: {
      title: 'Product engineering, zero to production — Camberi',
      description:
        'One team for design, frontend, backend and infrastructure, from zero to production — including regulated products where health data has to survive scrutiny.',
      ogTitle: 'From zero to a product in production, including the regulated kind',
    },
    es: {
      title: 'Ingeniería de producto, de cero a producción — Camberi',
      description:
        'Un solo equipo para diseño, frontend, backend e infraestructura, de cero a producción. También productos regulados con datos de salud que tienen que aguantar auditorías.',
      ogTitle: 'De cero a un producto en producción, también del tipo regulado',
    },
  },
};
