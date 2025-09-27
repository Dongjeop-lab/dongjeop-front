import { redirect, RedirectType } from 'next/navigation';

import {
  LabelStep1,
  LabelStep2,
  LabelStep3,
} from '@/features/label/components/label-step';

const LabelStepPage = async ({
  params,
}: {
  params: Promise<{ step: number; imageKey: string }>;
}) => {
  const { step: originalStep, imageKey } = await params;
  const step = Number(originalStep);

  switch (step) {
    case 1:
      return <LabelStep1 />;
    case 2:
      return <LabelStep2 />;
    case 3:
      return <LabelStep3 />;
    default:
      redirect(`/label/${imageKey}/1`, RedirectType.replace);
      return;
  }
};

export default LabelStepPage;
