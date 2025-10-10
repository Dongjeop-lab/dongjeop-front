import Image from 'next/image';
import { useState } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';

import { QuizStepProps } from '../../_types/quiz-step';
import QuizStepLayout from '../quiz-step-layout';
import QuizStep2Explanation from './quiz-step2-explanation';

// 정답 영역 정의 (px 기준, 360*540 이미지)
const answerAreas = [
  { id: 1, left: 90, top: 297, width: 150, height: 150 },
  { id: 2, left: 35, top: 127, width: 132, height: 132 },
  { id: 3, left: 213, top: 110, width: 147, height: 166 },
];

export const QuizStep2 = ({ onNext }: QuizStepProps) => {
  const [foundCount, setFoundCount] = useState<0 | 1 | 2 | 3>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [foundAreas, setFoundAreas] = useState<Set<number>>(new Set());

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    // 클릭한 위치의 실제 이미지 내 좌표 계산
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // 이미지 크기 대비 스케일 계산 (반응형 대응)
    const scaleX = rect.width / 360;
    const scaleY = rect.height / 540;

    // 어떤 영역을 클릭했는지 확인
    for (const area of answerAreas) {
      if (foundAreas.has(area.id)) continue; // 이미 찾은 영역은 스킵

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
                width={360}
                height={540}
              />

              {/* 디버깅용: 정답 영역 표시 (개발 완료 후 제거) */}
              {answerAreas.map(area => (
                <div
                  key={area.id}
                  className={`absolute border-2 ${
                    foundAreas.has(area.id)
                      ? 'border-green-500 bg-green-500/30'
                      : 'border-red-500 bg-red-500/20'
                  }`}
                  style={{
                    left: `${(area.left / 360) * 100}%`,
                    top: `${(area.top / 540) * 100}%`,
                    width: `${(area.width / 360) * 100}%`,
                    height: `${(area.height / 540) * 100}%`,
                  }}
                />
              ))}
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
