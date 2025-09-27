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

  if (isNaN(step) || step < 1 || step > 3) {
    redirect(`/label/${imageKey}/1`, RedirectType.replace);
  }

  switch (step) {
    case 1:
      return <LabelStep1 />;
    case 2:
      return <LabelStep2 />;
    case 3:
      return <LabelStep3 />;
    default:
      return null;
  }
};

export default LabelStepPage;
