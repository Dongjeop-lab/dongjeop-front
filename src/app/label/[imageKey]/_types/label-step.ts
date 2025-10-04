import { GetLabelStatusResponse } from '@/types/api/label';

export interface LabelStepProps {
  imageKey: string;
  currentLabelData?: GetLabelStatusResponse;
  onUpdateCache: (newData: Partial<GetLabelStatusResponse>) => void;
  onNext: VoidFunction;
}
