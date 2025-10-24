'use client';

import { useEffect, useId } from 'react';
import ReactFocusLock from 'react-focus-lock';

import { TERMS, TermsKey } from '@/lib/terms';
import { TermsContent } from '@/types/terms';

import { Portal } from './portal';

interface TermSheetProps {
  contentKey: TermsKey;
  onClose: VoidFunction;
}

const TermSheet = ({ contentKey, onClose }: TermSheetProps) => {
  const id = useId();

  const term = TERMS[contentKey];

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <Portal id={id}>
      <ReactFocusLock>
        <div className='absolute top-0 right-0 bottom-0 left-0 z-50 w-full overflow-y-auto bg-white'>
          <TermsHeader onClose={onClose} />
          <TermsContentComponent content={term} />
        </div>
      </ReactFocusLock>
    </Portal>
  );
};

export default TermSheet;

interface TermsContentProps {
  content: TermsContent;
}

const TermsContentComponent = ({ content }: TermsContentProps) => {
  return (
    <main className='px-5 pb-5'>
      {/* Title */}
      <h1 className='text-22-bold mb-2 text-black'>{content.title}</h1>

      {/* Subtitle */}
      <div className='text-14-medium mb-8 whitespace-pre-line text-[#727272]'>
        {content.subtitle}
      </div>

      {/* Sections */}
      <div className='space-y-5'>
        {content.sections.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            <h2 className='text-16-semibold mb-2 text-[#292929]'>
              {section.title}
            </h2>
            <ul>
              {section.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className='text-14-medium leading-[130%] text-[#727272]'
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
};

interface TermsHeaderProps {
  onClose: VoidFunction;
}
const TermsHeader = ({ onClose }: TermsHeaderProps) => {
  return (
    <header className='sticky top-0 z-10 bg-white'>
      <div className='flex h-11 items-center justify-end'>
        <button
          onClick={onClose}
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
