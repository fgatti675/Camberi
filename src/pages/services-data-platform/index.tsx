import { locale } from '../../i18n';
import type { Route } from '../../routes/types';
import { ServicePage } from '../services/ServicePage';
import { SERVICE_PATHS, type ServiceCopy } from '../services/service';
import { dataPlatformEn } from './copy.en';
import { dataPlatformEs } from './copy.es';

const copy: ServiceCopy = locale === 'es' ? dataPlatformEs : dataPlatformEn;

export function ServicesDataPlatform() {
  return <ServicePage copy={copy} path={SERVICE_PATHS[2]} />;
}

export const route: Route = {
  path: SERVICE_PATHS[2],
  priority: 0.8,
  component: ServicesDataPlatform,
  locales: {
    en: {
      title: 'Postgres data platform and backend migrations — Camberi',
      description:
        'Schema design, row-level security and migrations off Firebase, Supabase or another managed backend. FireCMS and Rebase implementation from the people who wrote them.',
      ogTitle: 'Postgres you own, and a clean way off the managed backend you have outgrown',
    },
    es: {
      title: 'Plataforma de datos en Postgres y migraciones — Camberi',
      description:
        'Diseño de esquemas, row-level security y salida de Firebase, Supabase u otro backend gestionado. Implantación de FireCMS y Rebase por quienes escribieron los frameworks.',
      ogTitle: 'Un Postgres que es tuyo, y una salida limpia del backend que se te ha quedado pequeño',
    },
  },
};
