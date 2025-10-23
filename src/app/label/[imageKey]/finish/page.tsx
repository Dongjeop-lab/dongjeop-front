'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import BottomCTA from '@/components/ui/bottom-cta';
import { BROWSER_PATH, ENTRY_QUERY } from '@/lib/path';

import FinishContent from './_components/finish-content';
import { useCardCapture } from './_hooks/use-card-capture';
import { useSubmissionResult } from './_hooks/use-submission-result';

const FinishPage = () => {
  const router = useRouter();
  const params = useParams<{ imageKey: string }>();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isCardCaptureLoading, setIsCardCaptureLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { handleCaptureWithBackground } = useCardCapture(cardRef);
  const { submissionResult, loading, error } = useSubmissionResult(
    params.imageKey
  );

  useEffect(() => {
    if (step !== 1) return;

    const timer = setTimeout(() => setStep(2), 1500);
    return () => clearTimeout(timer);
  }, [step]);

  const handleHammerClick = () => {
    if (step !== 2) return;
    setStep(3); // 3초간 애니메이션 실행 (컨페티 + 이미지 교체)

    setTimeout(() => {
      setStep(4);
    }, 1500);
  };

  const handleDownloadCard = async () => {
    if (!submissionResult || isCardCaptureLoading) return;

    setIsCardCaptureLoading(true);

    try {
      await handleCaptureWithBackground(
        `contribution-card-${submissionResult.seq_no}.png`,
        '/images/finish/capture-bg.png'
      );
    } catch {
      // useCardCapture에서 toast를 이미 띄웠으므로 추가 메시지 불필요
    } finally {
      setIsCardCaptureLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const shareUrl = `${window.location.origin}/?${ENTRY_QUERY.KEY}=${ENTRY_QUERY.VALUE}`;
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
      <main
        className={`flex min-h-screen flex-col items-center justify-center pt-11 pb-14 ${step === 4 && submissionResult ? 'mb-18' : ''}`}
      >
        <h1 className='sr-only'>등록 완료 페이지</h1>
        <FinishContent
          currentStep={step}
          submissionResult={submissionResult}
          onHammerClick={handleHammerClick}
          onDownloadCard={handleDownloadCard}
          isCardCaptureLoading={isCardCaptureLoading}
          cardRef={cardRef}
        />
      </main>

      {step === 4 ? (
        <BottomCTA hasAnimation>
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
      ) : (
        <div className='relative w-full'>
          <div className='fixed -bottom-18 left-1/2 h-36 w-full -translate-x-1/2 rounded-[50%/100%_100%_0_0] bg-[#ff8a00] opacity-80 blur-[180px]' />
        </div>
      )}
    </>
  );
};

export default FinishPage;
