import { locale } from '../../i18n';
import { ServicePage } from '../services/ServicePage';
import { SERVICE_PATHS, type ServiceCopy } from '../services/service';
import { productEn } from './copy.en';
import { productEs } from './copy.es';

const copy: ServiceCopy = locale === 'es' ? productEs : productEn;

export default function ServicesProduct() {
  return <ServicePage copy={copy} path={SERVICE_PATHS[1]} />;
}
