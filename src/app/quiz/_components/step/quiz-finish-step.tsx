'use client';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BROWSER_PATH } from '@/lib/path';
import { cn } from '@/lib/utils';

const STEP_DESCRIPTION = [
  `이동약자의 시선에\n조금 더 가까워졌나요?`,
  '그럼 이제 사진을\n등록하러 가봐요!',
];

const STEP_CHANGE_DELAY = 2000;
const ROUTE_TO_LABEL_UPLOAD_DELAY = 4000;

export const QuizFinishStep = () => {
  const [step, setStep] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(prev => Math.min(prev + 1, STEP_DESCRIPTION.length - 1));
    }, STEP_CHANGE_DELAY);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(BROWSER_PATH.LABEL.UPLOAD);
    }, ROUTE_TO_LABEL_UPLOAD_DELAY);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <div className='mt-11'>
        <div className='mb-[89px] flex flex-col items-center gap-2.5 px-5 pt-5 pb-[1.375rem]'>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn(
              'text-18-medium text-orange leading-[130%]',
              'tracking-[-0.01em]'
            )}
          >
            퀴즈를 다 풀었어요!
          </motion.h1>
          <AnimatePresence mode='wait'>
            <motion.p
              key={step}
              className='text-26-bold text-center leading-[130%] whitespace-break-spaces'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {STEP_DESCRIPTION[step]}
            </motion.p>
          </AnimatePresence>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            alt=''
            src='/images/quiz/heart.svg'
            width={145}
            height={124}
            className='mx-auto'
          />
        </motion.div>
      </div>
      <div className='relative w-full flex-1'>
        <div className='fixed -bottom-18 left-1/2 h-36 w-full -translate-x-1/2 rounded-[50%/100%_100%_0_0] bg-[#ff8a00] opacity-80 blur-[180px]' />
      </div>
    </>
  );
};
