import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

import { ANSWER_AREAS, SIZE } from '../../lib/constants';
import ExplanationBox from '../ui/explanation-box';

interface QuizStep2ExplanationProps {
  onNext: () => void;
}

const EXPLANATIONS = [
  {
    label: '계단 또는 턱',
    description: `바퀴가 걸려 진입 자체가 어려워질 수\n있어요`,
    areaId: 1,
  },
  {
    label: '높은 의자',
    description: `의자를 치워도 무릎 공간과 상판 높이가\n맞지 않아 이용이 불편해요.`,
    areaId: 2,
  },
  {
    label: '좁은 내부 폭',
    description: `테이블과 의자 때문에 동선이 끊기면\n이동과 회전이 힘들어요.`,
    areaId: 3,
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

  const currentAreaId = EXPLANATIONS[currentExplanation].areaId;
  const currentArea = ANSWER_AREAS.find(area => area.id === currentAreaId);

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

      <div className='flex flex-col justify-center'>
        <div className='relative inline-block'>
          <Image
            src='/images/quiz/quiz2-bg.png'
            alt='이동약자에게 불편할 수 있는 요소 3개가 포함된 이미지'
            width={SIZE.IMAGE_WIDTH}
            height={SIZE.IMAGE_HEIGHT}
          />

          {/* 현재 설명에 해당하는 원형 마커 표시 */}
          {currentArea && (
            <motion.div
              key={currentAreaId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className='absolute'
              style={{
                left: `${(currentArea.markerLeft / SIZE.IMAGE_WIDTH) * 100}%`,
                top: `${(currentArea.markerTop / SIZE.IMAGE_HEIGHT) * 100}%`,
                width: `${(SIZE.MARKER / SIZE.IMAGE_WIDTH) * 100}%`,
                height: `${(SIZE.MARKER / SIZE.IMAGE_HEIGHT) * 100}%`,
                pointerEvents: 'none',
              }}
            >
              <Image
                src='/images/quiz/marker.svg'
                alt='정답 위치'
                width={SIZE.MARKER}
                height={SIZE.MARKER}
              />
            </motion.div>
          )}
        </div>
        <div className='h-[5.9375rem] w-[22.5rem] bg-[#FFF2D5]'></div>
      </div>

      <motion.div
        key={currentExplanation}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className='absolute bottom-5'
      >
        <ExplanationBox
          label={EXPLANATIONS[currentExplanation].label}
          description={EXPLANATIONS[currentExplanation].description}
          onNext={handleNextExplanation}
        />
      </motion.div>
    </motion.div>
  );
};

export default QuizStep2Explanation;
