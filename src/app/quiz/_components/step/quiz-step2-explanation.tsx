import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

import ExplanationBox from '../ui/explanation-box';

interface QuizStep2ExplanationProps {
  onNext: () => void;
}

const EXPLANATIONS = [
  {
    label: '계단 또는 턱',
    description: `바퀴가 걸려 진입 자체가 어려워질 수\n있어요`,
  },
  {
    label: '높은 의자',
    description: `의자를 치워도 무릎 공간과 상판 높이가\n맞지 않아 이용이 불편해요.`,
  },
  {
    label: '좁은 내부 폭',
    description: `테이블과 의자 때문에 동선이 끊기면\n이동과 회전이 힘들어요.`,
  },
];

const QuizStep2Explanation = ({ onNext }: QuizStep2ExplanationProps) => {
  const [currentExplanation, setCurrentExplanation] = useState(0);

  const handleNextExplanation = () => {
    if (currentExplanation < EXPLANATIONS.length - 1) {
      setCurrentExplanation(prev => prev + 1);
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' },
      }}
      className='relative flex h-full flex-col items-center gap-11'
    >
      <h1 className='text-22-bold leading-[130%]'>정답을 같이 살펴볼까요?</h1>

      {/* TODO: 정답 위치 동그라미 추가 */}
      {/* TODO: currentExplanation 변할 때마다 이미지 위의 동그라미 위치 변경 */}
      <div className='flex flex-col justify-center'>
        <Image
          src='/images/quiz/quiz2-bg.png'
          alt='이동약자에게 불편할 수 있는 요소 3개가 포함된 이미지'
          width={360}
          height={540}
        />
        <div className='h-[5.9375rem] w-[22.5rem] bg-[#FFF2D5]'></div>
      </div>

      <div className='absolute bottom-5'>
        <ExplanationBox
          label={EXPLANATIONS[currentExplanation].label}
          description={EXPLANATIONS[currentExplanation].description}
          onNext={handleNextExplanation}
        />
      </div>
    </motion.div>
  );
};

export default QuizStep2Explanation;
