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
  const [answerStatus, setAnswerStatus] = useState<{
    [key: number]: boolean | null;
  }>({});

  const router = useRouter();

  const handleBack = () => {
    const isAnswered =
      answerStatus[currentStep] !== null &&
      answerStatus[currentStep] !== undefined;

    if (isAnswered) {
      setAnswerStatus(prev => ({
        ...prev,
        [currentStep]: null,
      }));
      return;
    }

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

  const handleAnswer = (isCorrect: boolean) => {
    setAnswerStatus(prev => ({
      ...prev,
      [currentStep]: isCorrect,
    }));
  };

  const renderStep = () => {
    const isCorrect = answerStatus[currentStep] ?? null;

    switch (currentStep) {
      case 1:
        return (
          <QuizStep1
            isCorrect={isCorrect}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <QuizStep2
            isCorrect={isCorrect}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <QuizStep3
            isCorrect={isCorrect}
            onNext={handleNext}
            onAnswer={handleAnswer}
          />
        );
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
