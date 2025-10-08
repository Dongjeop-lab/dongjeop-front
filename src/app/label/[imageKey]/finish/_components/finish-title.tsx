import * as motion from 'motion/react-client';
import { ReactNode } from 'react';

interface FinishTitleProps {
  title: ReactNode;
  subTitle?: ReactNode;
  skipInitial?: boolean;
}

const FinishTitle = ({
  title,
  subTitle,
  skipInitial = false,
}: FinishTitleProps) => {
  return (
    <motion.div
      initial={skipInitial ? false : { opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100%' }}
      layout
      transition={{
        type: 'spring',
        mass: 1,
        stiffness: 45,
        damping: 15,
        duration: 0.6,
      }}
      className='absolute top-0 left-0 flex h-32.75 w-90 flex-col items-center justify-center gap-y-2.5 overflow-hidden'
    >
      {subTitle && (
        <p className='text-18-semibold leading-[130%] tracking-[-0.01em] text-[#6f6f6f]'>
          {subTitle}
        </p>
      )}
      <h2 className='text-26-bold text-center leading-[130%] whitespace-break-spaces'>
        {title}
      </h2>
    </motion.div>
  );
};

export default FinishTitle;
