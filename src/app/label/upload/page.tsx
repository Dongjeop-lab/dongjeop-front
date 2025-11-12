import { getEntryTypeParam, getLandingPathParam } from '@/lib/queryParams';

import UploadContainer from './_components/upload-container';

interface UploadPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const UploadPage = async ({ searchParams }: UploadPageProps) => {
  const resolvedParams = searchParams ? await searchParams : {};
  const entryType = getEntryTypeParam(resolvedParams);
  const landingPath = getLandingPathParam(resolvedParams);

  return (
    <UploadContainer
      entryType={entryType}
      landingPath={landingPath}
    />
  );
};

export default UploadPage;
