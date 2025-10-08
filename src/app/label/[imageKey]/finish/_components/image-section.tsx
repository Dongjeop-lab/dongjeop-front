import Image from 'next/image';
import { useState } from 'react';

import { GetSubmissionResultResponse } from '@/types/api/submission';

import { SubmissionCard } from './submission-card';

interface ImageSectionProps {
  mainStep: 1 | 2 | 3 | 4;
  submissionResult: GetSubmissionResultResponse;
  onHammerClick: () => void;
}

export const ImageSection = ({
  mainStep,
  submissionResult,
  onHammerClick,
}: ImageSectionProps) => {
  const [showContributionCard, setShowContributionCard] = useState(false); // 카드 flip

  const handleImageClick = () => {
    if (mainStep === 2) {
      onHammerClick();
    }
  };

  const handleCardFlip = () => {
    if (mainStep === 4) {
      setShowContributionCard(prev => !prev);
    }
  };

  return (
    <div className='relative h-85 w-75'>
      {(mainStep === 1 || mainStep === 2) && (
        <figure
          className={`relative h-full w-full overflow-hidden rounded-2xl ${mainStep === 2 ? 'cursor-pointer' : ''}`}
          onClick={mainStep === 2 ? handleImageClick : undefined}
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

      {mainStep === 3 && (
        <div className='relative h-full w-full'>
          <Image
            src='/images/finish/stairs-finish.svg'
            alt=''
            aria-hidden='true'
            fill
            className='object-cover'
          />
        </div>
      )}

      {mainStep === 4 && (
        <div
          onClick={handleCardFlip}
          className='relative h-full w-full'
        >
          {showContributionCard ? (
            <SubmissionCard
              seqNo={submissionResult.seq_no}
              achievementRate={submissionResult.achievement_rate}
            />
          ) : (
            <Image
              src='/images/finish/stairs-finish.svg'
              alt=''
              aria-hidden='true'
              fill
              className='object-cover'
            />
          )}
        </div>
      )}
    </div>
  );
};
