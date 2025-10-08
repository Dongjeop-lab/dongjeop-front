'use client';

import { useRouter } from 'next/navigation';

const TermsHeader = () => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <header className='sticky top-0 z-10 bg-white'>
      <div className='flex h-11 items-center justify-end'>
        <button
          onClick={handleClose}
          className='pr-3'
          aria-label='닫기'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18 6L6 18M6 6L18 18'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TermsHeader;
