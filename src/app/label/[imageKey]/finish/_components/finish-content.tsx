import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { RefObject, useState } from 'react';

import { GetSubmissionResultResponse } from '@/types/api/submission';

import { ConfettiAnimation } from './confetti-animation';
import FinishTitle from './finish-title';
import { ImageSection } from './image-section';

interface FinishContentProps {
  currentStep: 1 | 2 | 3 | 4;
  submissionResult: GetSubmissionResultResponse;
  onHammerClick: () => void;
  onDownloadCard?: () => void;
  cardRef?: RefObject<HTMLDivElement | null>;
}

const FinishContent = ({
  currentStep,
  submissionResult,
  onHammerClick,
  onDownloadCard,
  cardRef,
}: FinishContentProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <section className='relative flex h-full w-full flex-col items-center gap-y-5'>
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
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={() => setIsAnimating(false)}
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
        <div className='absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center'>
          <ConfettiAnimation />
        </div>
      )}

      {/* 중앙 이미지 영역 */}
      <div className='p-7.5'>
        <ImageSection
          step={currentStep}
          submissionResult={submissionResult}
          onHammerClick={() => {
            if (!isAnimating) onHammerClick();
          }}
          cardRef={cardRef}
        />
      </div>

      {/* 이미지 저장 버튼 */}
      {currentStep === 4 && submissionResult && (
        <AnimatePresence>
          <motion.button
            className='absolute top-full left-1/2 flex -translate-x-1/2 gap-x-1 rounded-[50px] bg-[#292929] py-2.5 pr-6 pl-4.5'
            onClick={onDownloadCard}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeIn', duration: 0.5 }}
          >
            <Image
              src='/images/finish/download.svg'
              alt='기여카드 이미지 저장하기'
              width={18}
              height={18}
            />
            <p className='text-16-semibold leading-[130%] tracking-[-0.01em] text-white'>
              이미지 저장
            </p>
          </motion.button>
        </AnimatePresence>
      )}
    </section>
  );
};

export default FinishContent;
