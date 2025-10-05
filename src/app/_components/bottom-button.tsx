'use client';

import { useRouter } from 'next/navigation';

import { BROWSER_PATH } from '@/lib/path';
import { buildUrlWithServerParams } from '@/lib/queryParams';

interface BottomButtonProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const BottomButton = ({ searchParams = {} }: BottomButtonProps) => {
  const router = useRouter();

  const handleNavigateToAccessibilityQuiz = () => {
    const url = buildUrlWithServerParams(
      BROWSER_PATH.QUIZ.DEFAULT,
      searchParams,
      { step: '1' }
    );
    router.push(url);
  };

  const handleNavigateToUpload = () => {
    const url = buildUrlWithServerParams(
      BROWSER_PATH.LABEL.UPLOAD,
      searchParams
    );
    router.push(url);
  };

  return (
    <nav
      aria-label='이벤트 참여 액션'
      className='fixed right-0 bottom-0 left-0 flex w-full flex-col items-center gap-2 bg-gradient-to-t from-white from-60% to-transparent px-[1.25rem] py-[2.5rem]'
    >
      <button
        type='button'
        onClick={handleNavigateToAccessibilityQuiz}
        aria-label='접근성 퀴즈 풀어보기 페이지로 이동'
        className='bg-secondary text-secondary-foreground h-[3.125rem] w-full rounded-[0.75rem] px-[2rem] py-[0.5rem] text-[1rem] leading-[100%] font-semibold tracking-[-0.015em]'
      >
        접근성 퀴즈 풀어보기
      </button>
      <button
        type='button'
        onClick={handleNavigateToUpload}
        aria-label='실내 사진 업로드 페이지로 이동'
        className='bg-primary h-[3.125rem] w-full rounded-[0.75rem] px-[2rem] py-[0.5rem] text-[1rem] leading-[100%] font-semibold tracking-[-0.015em] text-white'
      >
        1분만에 실내 사진 올리기
      </button>
    </nav>
  );
};

export default BottomButton;
