'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';
import { FINISH_LABEL_TRANSITION_DELAY } from '@/lib/constants';
import { BROWSER_PATH } from '@/lib/path';
import { GetSubmissionResultResponse } from '@/types/api/submission';

import FinishStep from './_components/finish-step';

// TODO: 외부 API 호출 후 제거
const mockData: GetSubmissionResultResponse = {
  seq_no: 344,
  achievement_rate: 80,
  total_image_num: 200,
};

const FinishPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(2);
    }, FINISH_LABEL_TRANSITION_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <main className={`flex h-screen flex-col items-center overflow-hidden`}>
        <h1 className='sr-only'>등록 완료 페이지</h1>
        <FinishStep
          currentStep={step}
          seqNo={mockData.seq_no}
          achievementRate={mockData.achievement_rate}
          totalImageNum={mockData.total_image_num}
        />
      </main>

      {step === 2 && (
        <BottomCTA hasAnimation>
          <BottomCTA.Button variant='secondary'>
            친구에게 공유하기
          </BottomCTA.Button>
          <BottomCTA.Button
            variant='primary'
            onClick={() => router.push(BROWSER_PATH.LABEL.UPLOAD)}
          >
            한 장 더 등록하기
          </BottomCTA.Button>
        </BottomCTA>
      )}
    </>
  );
};

export default FinishPage;
