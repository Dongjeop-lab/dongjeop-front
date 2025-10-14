import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';
import { cn } from '@/lib/utils';

import { QuizStepProps } from '../../_types/quiz-step';
import { ANSWER_AREAS, SIZE } from '../../lib/constants';
import QuizStepLayout from '../quiz-step-layout';
import QuizStep2Explanation from './quiz-step2-explanation';

const FADE_ANIMATION = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeIn' as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
};

export const QuizStep2 = ({ onNext }: QuizStepProps) => {
  const [foundCount, setFoundCount] = useState<0 | 1 | 2 | 3>(0);
  const [foundAreas, setFoundAreas] = useState<Set<number>>(new Set());
  const [wrongClickCount, setWrongClickCount] = useState<number>(0);
  const [showRetryMessage, setShowRetryMessage] = useState<boolean>(false);
  const [hintAreaId, setHintAreaId] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const scaleX = rect.width / SIZE.IMAGE_WIDTH;
    const scaleY = rect.height / SIZE.IMAGE_HEIGHT;

    let isCorrect = false;

    for (const area of ANSWER_AREAS) {
      if (foundAreas.has(area.id)) continue;

      const scaledLeft = area.left * scaleX;
      const scaledTop = area.top * scaleY;
      const scaledRight = scaledLeft + area.width * scaleX;
      const scaledBottom = scaledTop + area.height * scaleY;

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
        setHintAreaId(null);
        isCorrect = true;
        break;
      }
    }

    if (!isCorrect) {
      setWrongClickCount(prev => prev + 1);
      setShowRetryMessage(true);
      setTimeout(() => {
        setShowRetryMessage(false);
      }, 1500);
    }
  };

  const handleShowHint = () => {
    const remainingAreas = ANSWER_AREAS.filter(
      area => !foundAreas.has(area.id)
    );
    if (remainingAreas.length > 0) {
      const randomArea =
        remainingAreas[Math.floor(Math.random() * remainingAreas.length)];
      setHintAreaId(randomArea.id);
    }
  };

  if (showExplanation) return <QuizStep2Explanation onNext={onNext} />;

  return (
    <>
      <QuizStepLayout
        currentStep={2}
        title={`이동약자에게 불편할 수 있는\n요소 3개를 찾아주세요`}
        subTitle={
          <p>
            <span className='text-border-blue'>{foundCount}/3개</span>
            <span> 찾았어요</span>
          </p>
        }
        quizContent={
          <div className='flex justify-center'>
            <div
              className='relative w-full max-w-[26.875rem] min-w-[22.5rem] cursor-pointer'
              onClick={handleImageClick}
            >
              <Image
                src='/images/quiz/quiz2-bg.png'
                alt='이동약자에게 불편할 수 있는 요소 3개가 포함된 이미지'
                width={SIZE.IMAGE_WIDTH}
                height={SIZE.IMAGE_HEIGHT}
                className='h-auto w-full'
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
                        src='/images/quiz/marker.svg'
                        alt='찾았어요'
                        width={SIZE.MARKER}
                        height={SIZE.MARKER}
                      />
                    </div>
                  )
              )}

              {/* 힌트 마커 표시 */}
              {hintAreaId && (
                <motion.div
                  key={`hint-${hintAreaId}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className='absolute'
                  style={{
                    left: `${(ANSWER_AREAS.find(a => a.id === hintAreaId)!.markerLeft / SIZE.IMAGE_WIDTH) * 100}%`,
                    top: `${(ANSWER_AREAS.find(a => a.id === hintAreaId)!.markerTop / SIZE.IMAGE_HEIGHT) * 100}%`,
                    width: `${(SIZE.MARKER / SIZE.IMAGE_WIDTH) * 100}%`,
                    height: `${(SIZE.MARKER / SIZE.IMAGE_HEIGHT) * 100}%`,
                    pointerEvents: 'none',
                  }}
                >
                  <Image
                    src='/images/quiz/marker-hint.svg'
                    alt='정답 위치'
                    width={SIZE.MARKER}
                    height={SIZE.MARKER}
                  />
                </motion.div>
              )}

              {/* 오답 영역 클릭 시 */}
              <AnimatePresence>
                {wrongClickCount >= 3 && foundCount !== 3 && (
                  <motion.button
                    key='hint'
                    type='button'
                    onClick={handleShowHint}
                    {...FADE_ANIMATION}
                    className={cn(
                      'text-16-semibold absolute bottom-5 left-1/2 w-30 -translate-x-1/2 rounded-[3.125rem] bg-black py-3 text-center leading-none text-white shadow-[0px_4px_4px_0px_#00000040]',
                      'tracking-[-0.02em]'
                    )}
                  >
                    힌트 보기
                  </motion.button>
                )}

                {wrongClickCount < 3 &&
                  foundCount !== 3 &&
                  showRetryMessage && (
                    <motion.div
                      key='retry'
                      {...FADE_ANIMATION}
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
