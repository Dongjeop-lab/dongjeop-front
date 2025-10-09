import { forwardRef } from 'react';

import { AchievementBar } from './achievement-bar';

interface SubmissionsCardProps {
  seqNo: number;
  achievementRate: number;
}

export const SubmissionCard = forwardRef<HTMLDivElement, SubmissionsCardProps>(
  ({ seqNo, achievementRate }, ref) => {
    return (
      <div
        ref={ref}
        className='flex h-full w-full flex-col gap-y-1.5 rounded-2xl bg-[url(/images/finish/submission-card-bg.svg)] p-7.5 pt-12.5'
      >
        <div className='text-18-bold'>
          <p>지금까지 모인 사진</p>
          <p className='text-[2.625rem] leading-[130%] text-[#984200]'>
            {seqNo}장
          </p>
        </div>

        <p className='text-16-regular flex-1 text-[#696969]'>
          이동약자를 위한 실내 접근성 분석
          <br />
          AI 모델 제작에 기여했어요.
        </p>

        <div className='flex flex-col gap-y-4'>
          <AchievementBar achievementRate={achievementRate} />
          <p className='text-16-semibold text-center leading-[130%] tracking-[-0.02em] text-[#696969]'>
            목표까지 {achievementRate}% 남았어요
          </p>
        </div>
      </div>
    );
  }
);

SubmissionCard.displayName = 'SubmissionCard';
