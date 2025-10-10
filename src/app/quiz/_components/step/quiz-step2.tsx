import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';
import { cn } from '@/lib/utils';

import { QuizStepProps } from '../../_types/quiz-step';
import { ANSWER_AREAS, SIZE } from '../../lib/constants';
import QuizStepLayout from '../quiz-step-layout';
import QuizStep2Explanation from './quiz-step2-explanation';

export const QuizStep2 = ({ onNext }: QuizStepProps) => {
  const [foundCount, setFoundCount] = useState<0 | 1 | 2 | 3>(0);
  const [foundAreas, setFoundAreas] = useState<Set<number>>(new Set());
  const [wrongClickCount, setWrongClickCount] = useState<number>(0);
  const [showRetryMessage, setShowRetryMessage] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const scaleX = rect.width / SIZE.IMAGE_WIDTH;
    const scaleY = rect.height / SIZE.IMAGE_HEIGHT;

    for (const area of ANSWER_AREAS) {
      if (foundAreas.has(area.id)) continue;

      const scaledLeft = area.left * scaleX;
      const scaledTop = area.top * scaleY;
      const scaledRight = scaledLeft + area.width * scaleX;
      const scaledBottom = scaledTop + area.height * scaleY;

      let isCorrect = false;

      if (
        clickX >= scaledLeft &&
        clickX <= scaledRight &&
        clickY >= scaledTop &&
        clickY <= scaledBottom
      ) {
        const newFoundAreas = new Set(foundAreas).add(area.id);
        setFoundAreas(newFoundAreas);
        setFoundCount(newFoundAreas.size as 0 | 1 | 2 | 3);
        setWrongClickCount(0);
        setShowRetryMessage(false);
        isCorrect = true;
        return;
      }

      if (!isCorrect) {
        setWrongClickCount(prev => prev + 1);
        setShowRetryMessage(true);
        setTimeout(() => {
          setShowRetryMessage(false);
        }, 1500);
      }
    }
  };

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
            <div
              className='relative inline-block cursor-pointer'
              onClick={handleImageClick}
            >
              <Image
                src='/images/quiz/quiz2-bg.png'
                alt='이동약자에게 불편할 수 있는 요소 3개가 포함된 이미지'
                width={SIZE.IMAGE_WIDTH}
                height={SIZE.IMAGE_HEIGHT}
              />

              {/* 클릭 마커 표시 */}
              {ANSWER_AREAS.map(
                area =>
                  foundAreas.has(area.id) && (
                    <div
                      key={area.id}
                      className='absolute'
                      style={{
                        left: `${(area.markerLeft / SIZE.IMAGE_WIDTH) * 100}%`,
                        top: `${(area.markerTop / SIZE.IMAGE_HEIGHT) * 100}%`,
                        width: `${(SIZE.MARKER / SIZE.IMAGE_WIDTH) * 100}%`,
                        height: `${(SIZE.MARKER / SIZE.IMAGE_HEIGHT) * 100}%`,
                        pointerEvents: 'none',
                      }}
                    >
                      <Image
                        src='/images/quiz/ellipse-shadow.svg'
                        alt='찾았어요'
                        width={SIZE.MARKER}
                        height={SIZE.MARKER}
                      />
                    </div>
                  )
              )}

              {/* 오답 영역 클릭 시 */}
              <AnimatePresence>
                {wrongClickCount >= 3 && (
                  <motion.div
                    key='hint'
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.3, ease: 'easeIn' },
                    }}
                    className={cn(
                      'text-16-semibold absolute bottom-5 left-1/2 w-30 -translate-x-1/2 rounded-[3.125rem] bg-black py-3 text-center leading-none text-white shadow-[0px_4px_4px_0px_#00000040]',
                      'tracking-[-0.02em]'
                    )}
                  >
                    힌트 보기
                  </motion.div>
                )}

                {wrongClickCount < 3 && showRetryMessage && (
                  <motion.div
                    key='retry'
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.3, ease: 'easeIn' },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                    className='pointer-events-none absolute bottom-5 left-1/2 w-65 -translate-x-1/2 rounded-[0.75rem] bg-[#000000CC] py-3 text-center leading-none text-white'
                  >
                    다시 한 번 찾아보세요!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
