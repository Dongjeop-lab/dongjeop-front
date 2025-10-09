import { AnimatePresence } from 'motion/react';

import { GetSubmissionResultResponse } from '@/types/api/submission';

import { ConfettiAnimation } from './confetti-animation';
import FinishTitle from './finish-title';
import { ImageSection } from './image-section';

interface FinishContentProps {
  currentStep: 1 | 2 | 3 | 4;
  submissionResult: GetSubmissionResultResponse;
  onHammerClick: () => void;
}

const FinishContent = ({
  currentStep,
  submissionResult,
  onHammerClick,
}: FinishContentProps) => {
  return (
    <main className='relative flex h-full flex-col items-center gap-y-5'>
      {/* 타이틀 영역 */}
      <div className='relative h-32.75 w-90 overflow-hidden'>
        <AnimatePresence mode='popLayout'>
          {currentStep === 1 && (
            <FinishTitle
              key='step-1'
              title={`고마운 마음을\n망치로 바꿔드렸어요`}
              subTitle={'사진 등록 완료!'}
              skipInitial={true}
            />
          )}

          {(currentStep === 2 || currentStep === 3) && (
            <FinishTitle
              key='step-2-3'
              title={`망치를 눌러\n이동약자의 계단을\n부숴주세요`}
            />
          )}

          {currentStep === 4 && (
            <FinishTitle
              key='step-4'
              title={'친구에게 공유해\n계단을 부숴주세요'}
              subTitle={'아직 더 많은 사진이 필요해요'}
            />
          )}
        </AnimatePresence>
      </div>

      {/* 컨페티 오버레이 */}
      {currentStep === 3 && (
        <div className='pointer-events-none absolute top-0 left-0 z-500 flex h-full w-full items-center justify-center'>
          <ConfettiAnimation />
        </div>
      )}

      {/* 중앙 이미지 영역 */}
      {/* FIXME: 화면 정중앙에 위치하도록 수정 */}
      <div className='p-7.5'>
        <ImageSection
          step={currentStep}
          submissionResult={submissionResult}
          onHammerClick={onHammerClick}
        />
      </div>
    </main>
  );
};

export default FinishContent;
