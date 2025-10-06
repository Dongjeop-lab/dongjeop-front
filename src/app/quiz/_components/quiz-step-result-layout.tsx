import Image from 'next/image';
import { ReactNode } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';

interface QuizStepResultLayoutProps {
  isCorrect: boolean;
  description: ReactNode;
  onNextStep: VoidFunction;
}

const QuizStepResultLayout = ({
  isCorrect,
  description,
  onNextStep,
}: QuizStepResultLayoutProps) => {
  return (
    <>
      <div className='flex flex-col items-center gap-11'>
        <h1 className='flex flex-col items-center gap-5'>
          <Image
            src={isCorrect ? '/icons/correct.svg' : '/icons/incorrect.svg'}
            alt={isCorrect ? '정답' : '오답'}
            width={96}
            height={96}
          />
          <span className='text-[1.375rem] font-bold'>
            {isCorrect ? '정답이에요!' : '정답이 아니에요!'}
          </span>
        </h1>
        {description}
      </div>
      <BottomCTA>
        <BottomCTA.Button
          variant='primary'
          onClick={onNextStep}
        >
          다음
        </BottomCTA.Button>
      </BottomCTA>
    </>
  );
};

export default QuizStepResultLayout;
