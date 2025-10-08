import * as motion from 'motion/react-client';
import { ReactNode } from 'react';

interface FinishTitleProps {
  title: ReactNode;
  subTitle?: ReactNode;
}

const FinishTitle = ({ title, subTitle }: FinishTitleProps) => {
  return (
    <motion.div
      key='step-1-title'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='flex h-32.75 flex-col items-center justify-center gap-y-2.5'
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
