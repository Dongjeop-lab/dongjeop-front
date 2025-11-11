'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { BROWSER_PATH, SOURCE_QUERY } from '@/lib/path';
import { buildUrlWithSearchParams } from '@/lib/queryParams';

const BottomButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigateToAccessibilityQuiz = () => {
    const url = buildUrlWithSearchParams(
      BROWSER_PATH.QUIZ.DEFAULT,
      searchParams,
      { [SOURCE_QUERY.KEY]: SOURCE_QUERY.VALUE.QUIZ }
    );
    router.push(url);
  };

  const handleNavigateToUpload = () => {
    const url = buildUrlWithSearchParams(
      BROWSER_PATH.LABEL.UPLOAD,
      searchParams,
      { [SOURCE_QUERY.KEY]: SOURCE_QUERY.VALUE.DIRECT }
    );
    router.push(url);
  };

  return (
    <nav
      aria-label='이벤트 참여 액션'
      className='fixed right-0 bottom-0 left-0 flex w-full flex-col items-center gap-2 bg-gradient-to-t from-white from-60% to-transparent px-[1.25rem] pt-[2.5rem] pb-5'
    >
      <button
        type='button'
        onClick={handleNavigateToAccessibilityQuiz}
        aria-label='접근성 퀴즈 풀어보기 페이지로 이동'
        className='bg-secondary text-secondary-foreground text-16-semibold h-14 w-full rounded-[0.75rem] px-[2rem] py-[0.5rem] leading-[100%]'
      >
        접근성 퀴즈 풀어보기
      </button>
      <button
        type='button'
        onClick={handleNavigateToUpload}
        aria-label='실내 사진 업로드 페이지로 이동'
        className='bg-primary text-16-semibold h-14 w-full rounded-[0.75rem] px-[2rem] py-[0.5rem] leading-[100%] text-white'
      >
        1분만에 실내 사진 올리기
      </button>
    </nav>
  );
};

export default BottomButton;
