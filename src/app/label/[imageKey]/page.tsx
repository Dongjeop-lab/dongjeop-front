'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Header from '@/components/ui/header';
import {
  LabelStep1,
  LabelStep2,
  LabelStep3,
} from '@/features/label/components/label-step';

const LabelPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStep = parseInt(searchParams.get('step') || '1', 10);

  const handleNextStep = () => {
    if (currentStep === 3) {
      router.push('/label/finish');
      return;
    }

    const nextStep = currentStep + 1;
    router.push(`${pathname}?step=${nextStep}`);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      router.push('/label/upload');
      return;
    }

    const prevStep = currentStep - 1;
    router.push(`${pathname}?step=${prevStep}`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LabelStep1 onNext={handleNextStep} />;
      case 2:
        return <LabelStep2 onNext={handleNextStep} />;
      case 3:
        return <LabelStep3 />;
      default:
        return <LabelStep1 onNext={handleNextStep} />;
    }
  };

  return (
    <>
      <Header onBack={handleBack} />
      {renderStep()}
    </>
  );
};

export default LabelPage;
