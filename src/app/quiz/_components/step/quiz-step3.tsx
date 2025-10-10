import Image from 'next/image';
import { useState } from 'react';

import ButtonList from '@/components/ui/button-list';

import { QuizStepProps } from '../../_types/quiz-step';
import QuizStepLayout from '../quiz-step-layout';
import QuizStepResultLayout from '../quiz-step-result-layout';

const OPTIONS = [
  {
    title: '너무 좁아서 지나가기 어려워요',
    isCorrect: true,
  },
  {
    title: '충분히 지나갈 수 있어요',
    isCorrect: false,
  },
];

const IMAGE = {
  src: '/images/quiz/quiz3.png',
  width: 320,
  height: 280,
  alt: '따뜻한 조명이 켜진 레스토랑 내부를 낮은 시점에서 촬영한 사진. 나무 바닥과 테이블, 의자가 줄지어 놓여 있고, 멀리 창가에 손님들이 앉아 있다.',
  className: 'mx-auto w-full max-w-80 rounded-2xl',
};

export const QuizStep3 = ({ onNext }: QuizStepProps) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (isCorrect === null) {
    return (
      <QuizStepLayout
        currentStep={3}
        title={`휠체어나 유모차로\n이 길을 지날 수 있을까요?`}
        quizContent={
          <div className='flex flex-col gap-10 px-5 pb-5'>
            <Image
              {...IMAGE}
              alt={IMAGE.alt}
            />
            <ButtonList>
              {OPTIONS.map(({ title, isCorrect }) => (
                <ButtonList.Item
                  key={title}
                  title={title}
                  onClick={() => setIsCorrect(isCorrect)}
                />
              ))}
            </ButtonList>
          </div>
        }
      />
    );
  }

  return (
    <QuizStepResultLayout
      isCorrect={isCorrect}
      description={
        <div className='mb-13 flex flex-col gap-9 px-5 pb-5'>
          <Image
            {...IMAGE}
            alt={IMAGE.alt}
          />
          <p className='text=[0.9375rem] text-center whitespace-break-spaces text-[#555]'>
            <span className='text-[#000]'>
              통로 폭은 이동약자가 공간을 이용할 수 있는지를
              <br />
              결정하는 중요한 요소예요.
            </span>
            <br />
            휠체어가 지나가려면 최소 90cm, 여유롭게는 120cm
            <br />
            이상이 필요해요.
          </p>
        </div>
      }
      onNextStep={onNext}
    />
  );
};
