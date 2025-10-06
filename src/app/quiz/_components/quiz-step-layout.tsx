import { ReactNode } from 'react';

import ProgressBar from '@/components/ui/progress-bar';

interface QuizStepLayoutProps {
  currentStep: number;
  totalStep?: number;
  title: ReactNode;
  subTitle?: ReactNode;
  quizContent: ReactNode;
}

const DEFAULT_TOTAL_STEPS = 3;

const QuizStepLayout = ({
  currentStep,
  quizContent,
  title,
  subTitle,
  totalStep = DEFAULT_TOTAL_STEPS,
}: QuizStepLayoutProps) => {
  return (
    <div className='flex flex-col items-center gap-8'>
      <ProgressBar progress={currentStep / totalStep} />
      <div className='flex flex-col items-center gap-2'>
        <span className='text-orange text-22-bold'>{`Q${currentStep}.`}</span>
        <h1 className='text-22-bold text-center whitespace-break-spaces'>
          {title}
        </h1>
        {subTitle && (
          <p className='text-center whitespace-break-spaces text-[#727272]'>
            {subTitle}
          </p>
        )}
      </div>
      <div className='w-full'>{quizContent}</div>
    </div>
  );
};

export default QuizStepLayout;
