import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { GetSubmissionResultResponse } from '@/types/api/submission';

import { SubmissionCard } from './submission-card';

interface ImageSectionProps {
  step: 1 | 2 | 3 | 4;
  submissionResult: GetSubmissionResultResponse;
  onHammerClick: () => void;
}

export const ImageSection = ({
  step,
  submissionResult,
  onHammerClick,
}: ImageSectionProps) => {
  const [showContributionCard, setShowContributionCard] = useState(false);

  const handleImageClick = () => {
    if (step === 2) {
      onHammerClick();
    }
  };

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => setShowContributionCard(true), 800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className='relative h-85 w-75'>
      <AnimatePresence>
        {(step === 1 || step === 2) && (
          <figure
            key='hammer-stairs'
            className={`relative h-full w-full overflow-hidden rounded-2xl ${step === 2 ? 'cursor-pointer' : ''}`}
            onClick={step === 2 ? handleImageClick : undefined}
          >
            <Image
              src='/images/upload/stairs-upload.svg'
              alt=''
              aria-hidden='true'
              fill
              className='object-cover'
            />
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <Image
                src='/images/upload/icon-hammer.svg'
                alt=''
                aria-hidden='true'
                width={161.54}
                height={161.54}
              />
              <Image
                src='/images/upload/tooltip.svg'
                alt=''
                aria-hidden='true'
                width={76.85}
                height={45.69}
              />
            </div>
          </figure>
        )}

        {(step === 3 || (step === 4 && !submissionResult)) && (
          <motion.div
            key='crushed-stairs'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeIn', duration: 0.8 }}
            className='relative h-full w-full'
          >
            <Image
              src='/images/finish/stairs-finish.svg'
              alt=''
              aria-hidden='true'
              fill
              className='object-cover'
            />
          </motion.div>
        )}

        {step === 4 && submissionResult && (
          <motion.div
            key='flip-card'
            className='relative h-full w-full'
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: showContributionCard ? 180 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 앞면 */}
            <div
              className='absolute inset-0'
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Image
                src='/images/finish/stairs-finish.svg'
                alt=''
                aria-hidden='true'
                fill
                className='object-cover'
              />
            </div>

            {/* 뒷면 */}
            <div
              className='absolute inset-0'
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <SubmissionCard
                seqNo={submissionResult.seq_no}
                achievementRate={submissionResult.achievement_rate}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
