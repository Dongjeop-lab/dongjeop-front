'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Header from '@/components/ui/header';
import { sendGAEvent } from '@/lib/ga';

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

  useEffect(() => {
    if (currentStep === FIRST_STEP) {
      sendGAEvent('quiz_start', {
        event_category: '퀴즈 퍼널',
        event_label: '1단계 - 퀴즈 시작',
        quiz_step: currentStep,
      });
    } else if (currentStep === FINISH_STEP) {
      sendGAEvent('quiz_finish', {
        event_category: '퀴즈 퍼널',
        event_label: '4단계 - 퀴즈 완료',
        quiz_step: currentStep,
      });
    } else {
      sendGAEvent('quiz_step_view', {
        event_category: '퀴즈 퍼널',
        event_label: `${currentStep}단계 - 퀴즈 진행`,
        quiz_step: currentStep,
      });
    }
  }, [currentStep]);

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
