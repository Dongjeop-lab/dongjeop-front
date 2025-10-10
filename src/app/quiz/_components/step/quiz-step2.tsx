import Image from 'next/image';
import { useState } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';

import { QuizStepProps } from '../../_types/quiz-step';
import { ANSWER_AREAS, SIZE } from '../../lib/constants';
import QuizStepLayout from '../quiz-step-layout';
import QuizStep2Explanation from './quiz-step2-explanation';

export const QuizStep2 = ({ onNext }: QuizStepProps) => {
  const [foundCount, setFoundCount] = useState<0 | 1 | 2 | 3>(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [foundAreas, setFoundAreas] = useState<Set<number>>(new Set());

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

      if (
        clickX >= scaledLeft &&
        clickX <= scaledRight &&
        clickY >= scaledTop &&
        clickY <= scaledBottom
      ) {
        const newFoundAreas = new Set(foundAreas).add(area.id);
        setFoundAreas(newFoundAreas);
        setFoundCount(newFoundAreas.size as 0 | 1 | 2 | 3);
        break;
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
