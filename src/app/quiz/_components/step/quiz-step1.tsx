import Image from 'next/image';

import ButtonList from '@/components/ui/button-list';

import { QuizStepProps } from '../../_types/quiz-step';
import QuizStepLayout from '../quiz-step-layout';
import QuizStepResultLayout from '../quiz-step-result-layout';

const OPTIONS = [
  {
    title: '혼자 힘으로 턱을 넘어요',
    isCorrect: false,
  },
  {
    title: '경사로가 필요해요',
    isCorrect: true,
  },
];

const IMAGE = {
  src: '/images/quiz/quiz1.png',
  width: 320,
  height: 280,
  alt: '휠체어를 탄 젊은 남성이 카페 입구의 계단을 바라보고 있다. 카페 안 창가에는 다른 두 사람이 앉아 이야기를 나누고 있다.',
  className: 'mx-auto w-full max-w-80 rounded-2xl',
};

export const QuizStep1 = ({ isCorrect, onNext, onAnswer }: QuizStepProps) => {
  if (isCorrect === null) {
    return (
      <QuizStepLayout
        currentStep={1}
        title={`휠체어를 타고 이 식당에\n어떻게 들어갈 수 있을까요?`}
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
                  onClick={() => onAnswer(isCorrect)}
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
          <p className='text-center text-[0.9375rem] font-medium whitespace-break-spaces text-[#555]'>
            <span className='text-[#000]'>
              작은 턱 하나도 이동약자에게는 큰 벽이 될 수 있어요.
            </span>
            <br />
            경사로는{' '}
            <strong className='font-bold'>&quot;있으면 좋은 것&quot;</strong>
            이 아니라
            <br />
            이동약자에게 꼭 필요한 길이에요.
          </p>
        </div>
      }
      onNextStep={onNext}
    />
  );
};
