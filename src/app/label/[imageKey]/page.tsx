'use client';

import { AnimatePresence } from 'motion/react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import Header from '@/components/ui/header';
import {
  LabelStep1,
  LabelStep2,
  LabelStep3,
} from '@/features/label/components/label-step';
import { BROWSER_PATH } from '@/lib/path';

const LabelPage = () => {
  const router = useRouter();
  const params = useParams<{ imageKey: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const stepParam = Number.parseInt(searchParams.get('step') ?? '', 10);
  const currentStep = Number.isFinite(stepParam)
    ? Math.min(Math.max(stepParam, 1), 3)
    : 1;

  const handleNextStep = () => {
    if (currentStep === 3) {
      router.push(`${pathname}/finish`);
      return;
    }

    const nextStep = currentStep + 1;
    router.push(`${pathname}?step=${nextStep}`);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      router.push(BROWSER_PATH.LABEL.UPLOAD);
      return;
    }

    const prevStep = currentStep - 1;
    router.push(`${pathname}?step=${prevStep}`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <LabelStep1
            key={1}
            imageKey={params.imageKey}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <LabelStep2
            key={2}
            imageKey={params.imageKey}
            onNext={handleNextStep}
          />
        );
      case 3:
        return (
          <LabelStep3
            key={3}
            imageKey={params.imageKey}
            onNext={handleNextStep}
          />
        );
      default:
        return (
          <LabelStep1
            key={1}
            imageKey={params.imageKey}
            onNext={handleNextStep}
          />
        );
    }
  };

  return (
    <>
      <Header onBack={handleBack} />
      <div className='relative'>
        <AnimatePresence>{renderStep()}</AnimatePresence>
      </div>
    </>
  );
};

export default LabelPage;
