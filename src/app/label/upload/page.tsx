import UploadContainer from '@/features/upload/page';
import { getSourceParam } from '@/lib/queryParams';

interface UploadPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const UploadPage = ({ searchParams }: UploadPageProps) => {
  const source = getSourceParam(searchParams);

  return <UploadContainer source={source} />;
};

export default UploadPage;
