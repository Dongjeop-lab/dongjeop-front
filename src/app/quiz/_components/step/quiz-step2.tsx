import Image from 'next/image';
import { useState } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';

import { QuizStepProps } from '../../_types/quiz-step';
import QuizStepLayout from '../quiz-step-layout';
import QuizStep2Explanation from './quiz-step2-explanation';

export const QuizStep2 = ({ onNext }: QuizStepProps) => {
  const [foundCount, setFoundCount] = useState<0 | 1 | 2 | 3>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  if (showExplanation) return <QuizStep2Explanation onNext={onNext} />;

  return (
    <>
      <QuizStepLayout
        currentStep={2}
        title={`이동약자에게 불편할 수 있는\n요소 3개를 찾아주세요.`}
        subTitle={
          <p>
            <span className='text-border-blue'>{foundCount}/3개</span>
            <span> 찾았어요</span>
          </p>
        }
        quizContent={
          <div className='flex justify-center'>
            <Image
              src='/images/quiz/quiz2-bg.png'
              alt='이동약자에게 불편할 수 있는 요소 3개가 포함된 이미지'
              width={360}
              height={540}
            />
          </div>
        }
      />

      {foundCount === 3 && (
        <BottomCTA hasAnimation>
          <BottomCTA.Button
            variant={'primary'}
            onClick={() => setShowExplanation(true)}
          >
            다음
          </BottomCTA.Button>
        </BottomCTA>
      )}
    </>
  );
};
