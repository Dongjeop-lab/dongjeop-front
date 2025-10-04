import { getSourceParam } from '@/lib/queryParams';

import UploadContainer from './_components/upload-container';

interface UploadPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const UploadPage = async ({ searchParams }: UploadPageProps) => {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const sourceParam = resolvedParams?.source;

  const params = {
    source: Array.isArray(sourceParam) ? sourceParam[0] : sourceParam,
  };

  const source = getSourceParam(params);

  return <UploadContainer source={source} />;
};

export default UploadPage;
