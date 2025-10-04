import * as motion from 'motion/react-client';
import { ReactNode } from 'react';

interface FinishTitleProps {
  title: ReactNode;
  subTitle: ReactNode;
}

const FinishTitle = ({ title, subTitle }: FinishTitleProps) => {
  return (
    <motion.div
      key='step-1-title'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center gap-2.5 pb-[3.75rem]'
    >
      <p className='text-18-semibold text-primary'>{title}</p>
      <h2 className='text-26-bold text-center whitespace-break-spaces'>
        {subTitle}
      </h2>
    </motion.div>
  );
};

export default FinishTitle;
