import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';

import { GetSubmissionResultResponse } from '@/types/api/submission';

import FinishTitle from './finish-title';
import { ImageSection } from './image-section';

interface FinishStepProps {
  currentStep: 1 | 2 | 3 | 4;
  submissionResult: GetSubmissionResultResponse;
  onHammerClick: () => void;
}

const FinishStep = ({
  currentStep,
  submissionResult,
  onHammerClick,
}: FinishStepProps) => {
  return (
    <main className='relative flex h-full w-full flex-col items-center pt-11'>
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

      {/* 중앙 이미지 영역 */}
      {/* FIXME: 화면 정중앙에 위치하도록 수정 */}
      <div className='mt-5 p-7.5'>
        <ImageSection
          step={currentStep}
          submissionResult={submissionResult}
          onHammerClick={onHammerClick}
        />
      </div>

      {/* XXX: FinishPage에 작성하는게 나을지 고민 */}
      {currentStep !== 4 && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1, ease: 'easeOut', duration: 0.6 }}
            className='relative w-full'
          >
            <div className='fixed -bottom-18 left-1/2 h-36 w-full -translate-x-1/2 rounded-[50%/100%_100%_0_0] bg-[#ff8a00] opacity-80 blur-[180px]' />
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  );
};

export default FinishStep;
