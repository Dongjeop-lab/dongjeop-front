import Image from 'next/image';

import { cn } from '@/lib/utils';
import { ClassName } from '@/types/common';

interface LabelStepLayoutProps extends ClassName {
  title: string;
  description: string;
  imageKey: string;
  totalSteps: number;
  currentStep: number;
  labelingOptions: React.ReactNode;
}

const LabelStepLayout = ({
  currentStep,
  description,
  imageKey,
  labelingOptions,
  title,
  totalSteps,
  className,
}: LabelStepLayoutProps) => {
  return (
    <main
      className={cn('flex flex-col items-center gap-8 px-5 pb-5', className)}
    >
      <div className='flex flex-col items-center gap-3'>
        <span className='text-18-semibold text-primary'>
          {currentStep}/{totalSteps}
        </span>
        <div className='flex flex-col items-center gap-1.5'>
          <h1 className='text-26-bold text-[#292929]'>{title}</h1>
          <p className='text-18-medium text-center whitespace-break-spaces text-[#727272]'>
            {description}
          </p>
        </div>
      </div>
      <div className='flex w-full flex-col items-center gap-6'>
        <Image
          src={imageKey} // TODO: 이미지 url로 변경 필요
          alt='라벨링하는 풍경'
          height={280}
          width={300}
          className='h-[280px] w-fit max-w-screen rounded-lg object-cover'
        />
        {labelingOptions}
      </div>
    </main>
  );
};

export default LabelStepLayout;
