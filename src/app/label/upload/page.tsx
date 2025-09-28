import UploadContainer from '@/features/upload/page';
import { getSourceParam } from '@/lib/queryParams';

interface UploadPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const UploadPage = async ({ searchParams }: UploadPageProps) => {
  const resolvedParams = await searchParams;

  const params = {
    source: Array.isArray(resolvedParams.source)
      ? resolvedParams.source[0]
      : resolvedParams.source,
  };

  const source = getSourceParam(params);

  return <UploadContainer source={source} />;
};

export default UploadPage;
