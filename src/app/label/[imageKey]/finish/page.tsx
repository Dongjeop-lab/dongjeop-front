'use client';
import { useEffect, useState } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';
import { SubmissionResultResponse } from '@/types/api/submission';

import FinishStep1 from './_components/finish-step-1';
import FinishStep2 from './_components/finish-step-2';

// TODO: 외부 API 호출 후 제거
const mockData: SubmissionResultResponse = {
  seq_no: 344,
  achievement_rate: 80,
  total_image_num: 200,
};

const FinishPage = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(2);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='h-screen w-full'>
      <main
        className='flex flex-col items-center justify-center'
        style={{ minHeight: 'calc(100vh - 56px)' }}
      >
        {step === 1 ? (
          <FinishStep1 seqNo={mockData.seq_no} />
        ) : (
          <FinishStep2
            achievementRate={mockData.achievement_rate}
            totalImageNum={mockData.total_image_num}
          />
        )}
      </main>

      {step === 2 && (
        <BottomCTA>
          <BottomCTA.Button variant='secondary'>
            친구에게 공유하기
          </BottomCTA.Button>
          <BottomCTA.Button variant='primary'>
            한 장 더 등록하기
          </BottomCTA.Button>
        </BottomCTA>
      )}
    </div>
  );
};

export default FinishPage;
