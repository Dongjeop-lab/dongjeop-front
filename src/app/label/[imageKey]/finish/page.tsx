'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';
import { FINISH_LABEL_TRANSITION_DELAY } from '@/lib/constants';
import { BROWSER_PATH } from '@/lib/path';

import FinishStep from './_components/finish-step';
import { useSubmissionResult } from './_hooks/use-submission-result';

const FinishPage = () => {
  const router = useRouter();
  const params = useParams<{ imageKey: string }>();

  const { submissionResult, loading, error } = useSubmissionResult(
    params.imageKey
  );
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (loading || !submissionResult) return;

    const timer = setTimeout(() => {
      setStep(2);
    }, FINISH_LABEL_TRANSITION_DELAY);

    return () => clearTimeout(timer);
  }, [loading, submissionResult]);

  // TODO: 로딩 UI 요청
  if (loading) {
    return (
      <main className='flex h-screen flex-col items-center justify-center'>
        <p>로딩 중...</p>
      </main>
    );
  }

  // TODO: 에러 UI 요청
  // XXX: ApiClient response에 statusCode가 없어 에러 메시지 문자열로 구분
  // 404
  if (error?.includes('존재하지 않는')) {
    return (
      <main className='flex h-screen flex-col items-center justify-center'>
        <p>{error}</p>
      </main>
    );
  }

  // 500 또는 데이터 없음
  if (error || !submissionResult) {
    return (
      <main className='flex h-screen flex-col items-center justify-center'>
        <p>{error || '데이터를 불러올 수 없습니다.'}</p>
      </main>
    );
  }

  return (
    <>
      <main className={`flex h-screen flex-col items-center overflow-hidden`}>
        <h1 className='sr-only'>등록 완료 페이지</h1>
        <FinishStep
          currentStep={step}
          seqNo={submissionResult.seq_no}
          achievementRate={submissionResult.achievement_rate}
          totalImageNum={submissionResult.total_image_num}
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
