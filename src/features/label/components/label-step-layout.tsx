import { Variants } from 'motion';
import * as motion from 'motion/react-client';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { ClassName } from '@/types/common';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1, // 나타날 때와 반대 순서로 사라짐
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: {
      duration: 0.5,
    },
  },
};

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
  const imageUrl = process.env.NEXT_PUBLIC_LABEL_IMAGE_BASE_URL
    ? `${process.env.NEXT_PUBLIC_LABEL_IMAGE_BASE_URL}/${imageKey}`
    : '/images/dummy-label-image.png';

  return (
    <motion.main
      className={cn(
        'absolute inset-0 flex flex-col items-center gap-8 px-5 pb-5',
        className
      )}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <motion.div
        className='flex flex-col items-center gap-3'
        variants={itemVariants}
      >
        <span className='text-18-semibold text-primary'>
          {currentStep}/{totalSteps}
        </span>
        <div className='flex flex-col items-center gap-1.5'>
          <h1 className='text-26-bold text-[#292929]'>{title}</h1>
          <p className='text-18-medium text-center whitespace-break-spaces text-[#727272]'>
            {description}
          </p>
        </div>
      </motion.div>
      <div className='flex w-full flex-col items-center gap-6'>
        <Image
          src={imageUrl}
          alt='라벨링하는 풍경'
          height={280}
          width={300}
          className='h-[280px] w-fit max-w-screen rounded-lg object-cover'
        />
        {labelingOptions}
      </div>
    </motion.main>
  );
};

export default LabelStepLayout;
