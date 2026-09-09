import { locale } from '../../i18n';
import { ServicePage } from '../services/ServicePage';
import { SERVICE_PATHS, type ServiceCopy } from '../services/service';
import { architectureReviewEn } from './copy.en';
import { architectureReviewEs } from './copy.es';

const copy: ServiceCopy = locale === 'es' ? architectureReviewEs : architectureReviewEn;

export default function ServicesArchitectureReview() {
  return <ServicePage copy={copy} path={SERVICE_PATHS[3]} />;
}
