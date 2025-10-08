'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import BottomCTA from '@/components/ui/bottom-cta';
import { BROWSER_PATH, ENTRY_QUERY } from '@/lib/path';

import FinishStep from './_components/finish-step';
import { useSubmissionResult } from './_hooks/use-submission-result';

const FinishPage = () => {
  const router = useRouter();
  const params = useParams<{ imageKey: string }>();

  const { submissionResult, loading, error } = useSubmissionResult(
    params.imageKey
  );
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    if (step !== 1) return;

    const timer = setTimeout(() => setStep(2), 600);
    return () => clearTimeout(timer);
  }, [step]);

  const handleHammerClick = () => {
    if (step !== 2) return;

    // 3단계 애니메이션 시작 (6초)
    // 부서진 계단 이미지로 교체 + 컨페티 로티
    setStep(3);

    // 3단계 애니메이션 종료 후 4단계로 전환
    setTimeout(() => {
      setStep(4);
    }, 800);
  };

  const handleCopyToClipboard = async () => {
    try {
      const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}?${ENTRY_QUERY.KEY}=${ENTRY_QUERY.VALUE}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success('링크를 복사했어요. 친구에게 공유해보세요!');
    } catch (error) {
      toast.error('링크를 복사하지 못했어요. 다시 시도해주세요.');
      console.error(error);
    }
  };

  if (loading) return null;

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
        {/* TODO: loading || error 일 땐 기여카드 렌더링 X (prop 추가) */}
        <FinishStep
          currentStep={step}
          submissionResult={submissionResult}
          onHammerClick={handleHammerClick}
        />
      </main>

      {step === 4 && (
        <BottomCTA
          hasAnimation
          animationDuration={0.6}
        >
          <BottomCTA.Button
            variant='secondary'
            onClick={handleCopyToClipboard}
          >
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
