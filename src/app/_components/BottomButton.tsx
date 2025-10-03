'use client';

const BottomButton = () => {
  return (
    <div className='fixed right-0 bottom-0 left-0 flex w-full flex-col items-center gap-2 bg-gradient-to-t from-white from-60% to-transparent px-[1.25rem] py-[2.5rem]'>
      <button className='bg-secondary text-secondary-foreground h-[3.125rem] w-full rounded-[0.75rem] px-[2rem] py-[0.5rem] text-[1rem] leading-[100%] font-semibold tracking-[-0.015em]'>
        접근성 퀴즈 풀어보기
      </button>
      <button className='bg-primary h-[3.125rem] w-full rounded-[0.75rem] px-[2rem] py-[0.5rem] text-[1rem] leading-[100%] font-semibold tracking-[-0.015em] text-white'>
        1분만에 실내 사진 올리기
      </button>
    </div>
  );
};

export default BottomButton;
