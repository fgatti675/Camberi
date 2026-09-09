import { locale } from '../../i18n';
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

export default function ServicesAutomation() {
  return <ServicePage copy={copy} path={SERVICE_PATHS[0]} />;
}
