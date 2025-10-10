import Image from 'next/image';
import { useState } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';

import { QuizStepProps } from '../../_types/quiz-step';
import QuizStepLayout from '../quiz-step-layout';
import QuizStep2Explanation from './quiz-step2-explanation';

// 정답 영역 정의 (px 기준, 360*540 이미지)
const ANSWER_AREAS = [
  {
    id: 1,
    left: 90,
    top: 297,
    width: 150,
    height: 150,
    markerLeft: 133,
    markerTop: 340,
  },
  {
    id: 2,
    left: 35,
    top: 127,
    width: 132,
    height: 132,
    markerLeft: 69,
    markerTop: 161,
  },
  {
    id: 3,
    left: 213,
    top: 110,
    width: 147,
    height: 166,
    markerLeft: 283,
    markerTop: 161,
  },
] as const;

const IMAGE_WIDTH = 360;
const IMAGE_HEIGHT = 540;
const MARKER_SIZE = 64;

export const QuizStep2 = ({ onNext }: QuizStepProps) => {
  const [foundCount, setFoundCount] = useState<0 | 1 | 2 | 3>(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [foundAreas, setFoundAreas] = useState<Set<number>>(new Set());

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const scaleX = rect.width / IMAGE_WIDTH;
    const scaleY = rect.height / IMAGE_HEIGHT;

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
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
              />

              {/* 클릭 마커 표시 */}
              {ANSWER_AREAS.map(
                area =>
                  foundAreas.has(area.id) && (
                    <div
                      key={area.id}
                      className='absolute'
                      style={{
                        left: `${(area.markerLeft / IMAGE_WIDTH) * 100}%`,
                        top: `${(area.markerTop / IMAGE_HEIGHT) * 100}%`,
                        width: `${(MARKER_SIZE / IMAGE_WIDTH) * 100}%`,
                        height: `${(MARKER_SIZE / IMAGE_HEIGHT) * 100}%`,
                        pointerEvents: 'none',
                      }}
                    >
                      <Image
                        src='/images/quiz/ellipse-shadow.svg'
                        alt='찾았어요'
                        width={MARKER_SIZE}
                        height={MARKER_SIZE}
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
