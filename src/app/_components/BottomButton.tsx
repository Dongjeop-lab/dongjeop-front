'use client';

import { useRouter } from 'next/navigation';

import { BROWSER_PATH } from '@/lib/path';

const BottomButton = () => {
  const router = useRouter();

  const handleNavigateToAccessibilityQuiz = () => {
    router.push(`${BROWSER_PATH.QUIZ.DEFAULT}?step=1`);
  };

  const handleNavigateToUpload = () => {
    router.push(BROWSER_PATH.LABEL.UPLOAD);
  };
  return (
    <div className='fixed right-0 bottom-0 left-0 flex w-full flex-col items-center gap-2 bg-gradient-to-t from-white from-60% to-transparent px-[1.25rem] py-[2.5rem]'>
      <button
        type='button'
        onClick={handleNavigateToAccessibilityQuiz}
        className='bg-secondary text-secondary-foreground h-[3.125rem] w-full rounded-[0.75rem] px-[2rem] py-[0.5rem] text-[1rem] leading-[100%] font-semibold tracking-[-0.015em]'
      >
        접근성 퀴즈 풀어보기
      </button>
      <button
        type='button'
        onClick={handleNavigateToUpload}
        className='bg-primary h-[3.125rem] w-full rounded-[0.75rem] px-[2rem] py-[0.5rem] text-[1rem] leading-[100%] font-semibold tracking-[-0.015em] text-white'
      >
        1분만에 실내 사진 올리기
      </button>
    </div>
  );
};

export default BottomButton;
