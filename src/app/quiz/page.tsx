'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Header from '@/components/ui/header';

import {
  QuizFinishStep,
  QuizStep1,
  QuizStep2,
  QuizStep3,
} from './_components/step';

const FIRST_STEP = 1;
const FINISH_STEP = 4;

const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState(FIRST_STEP);

  const router = useRouter();

  const handleBack = () => {
    if (currentStep === FIRST_STEP) {
      router.push('/');
      return;
    }
    setCurrentStep(prev => Math.max(prev - 1, FIRST_STEP));
  };

  const handleNext = () => {
    if (currentStep === FINISH_STEP) {
      return;
    }

    setCurrentStep(prev => Math.min(prev + 1, FINISH_STEP));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <QuizStep1 onNext={handleNext} />;
      case 2:
        return <QuizStep2 onNext={handleNext} />;
      case 3:
        return <QuizStep3 onNext={handleNext} />;
      default:
        return null;
    }
  };

  if (currentStep === FINISH_STEP) {
    return <QuizFinishStep />;
  }

  return (
    <>
      <Header onBack={handleBack} />
      <main>{renderStep()}</main>
    </>
  );
};

export default QuizPage;
