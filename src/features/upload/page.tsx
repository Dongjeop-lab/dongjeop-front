import { SourceType } from '@/types/common';

interface UploadContainerProps {
  source: SourceType;
}
const UploadContainer = ({ source }: UploadContainerProps) => {
  return <div>{source}</div>;
};

export default UploadContainer;
