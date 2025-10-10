import Image from 'next/image';

import { cn } from '@/lib/utils';

interface ExplanationBoxProps {
  label: string;
  description: string;
  onNext: () => void;
}

const ExplanationBox = ({
  label,
  description,
  onNext,
}: ExplanationBoxProps) => {
  return (
    <div className='flex w-80 rounded-2xl bg-white py-5.5 pr-4 pl-5.5'>
      <div className='flex-1'>
        <p className={cn('text-16-bold', 'tracking-[-0.5px]')}>{label}</p>
        <p className='text-[15px] leading-[21px] font-medium tracking-[-0.5px] whitespace-pre-line text-[#555555]'>
          {description}
        </p>
      </div>

      <button
        type='button'
        onClick={onNext}
      >
        <Image
          src='/images/quiz/next-explanation.svg'
          alt='다음 해설으로 이동'
          width={32}
          height={32}
        />
      </button>
    </div>
  );
};

export default ExplanationBox;
