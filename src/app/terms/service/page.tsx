import { TERMS } from '@/lib/terms';

import TermsContentComponent from '../_components/terms-content';

const ServiceTermsPage = () => {
  return <TermsContentComponent content={TERMS.SERVICE} />;
};

export default ServiceTermsPage;
