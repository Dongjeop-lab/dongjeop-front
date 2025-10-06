'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Header from '@/components/ui/header';
import { BROWSER_PATH } from '@/lib/path';

import { QuizStep1, QuizStep2, QuizStep3 } from './_components/step';

const FIRST_STEP = 1;
const LAST_STEP = 3;

const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();

  const handleBack = () => {
    if (currentStep === 1) {
      router.push('/');
      return;
    }
    setCurrentStep(prev => Math.max(prev - 1, FIRST_STEP));
  };

  const handleNext = () => {
    if (currentStep === LAST_STEP) {
      //TODO: 완료 페이지를 새로운 페이지로 할 지 해당 페이지에서 처리할 지 논의 필요
      router.push(BROWSER_PATH.QUIZ.FINISH);
      return;
    }

    setCurrentStep(prev => Math.min(prev + 1, LAST_STEP));
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

  return (
    <>
      <Header onBack={handleBack} />
      <main>{renderStep()}</main>
    </>
  );
};

export default QuizPage;
