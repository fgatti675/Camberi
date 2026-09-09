import { locale } from '../../i18n';
import { ServicePage } from '../services/ServicePage';
import { SERVICE_PATHS, type ServiceCopy } from '../services/service';
import { dataPlatformEn } from './copy.en';
import { dataPlatformEs } from './copy.es';

const copy: ServiceCopy = locale === 'es' ? dataPlatformEs : dataPlatformEn;

export default function ServicesDataPlatform() {
  return <ServicePage copy={copy} path={SERVICE_PATHS[2]} />;
}
