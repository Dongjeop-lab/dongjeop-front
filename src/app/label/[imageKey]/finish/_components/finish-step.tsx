import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import CountUp from 'react-countup';

import { cn } from '@/lib/utils';

import { CircularProgress } from './circular-progress';
import FinishTitle from './finish-title';

interface FinishStep1Props {
  currentStep: number;
  seqNo: number;
  achievementRate: number;
  totalImageNum: number;
}

const fadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

const FinishStep = ({
  seqNo,
  achievementRate,
  currentStep,
  totalImageNum,
}: FinishStep1Props) => {
  return (
    <main className='flex flex-col items-center pt-11'>
      <section className='flex w-[360px] flex-1 flex-col items-center justify-center pt-5 pb-[1.875rem]'>
        <AnimatePresence mode='wait'>
          {currentStep === 1 ? (
            <FinishTitle
              title={'사진 등록 완료!'}
              subTitle={`${seqNo}번째 기여자세요!\n함께해 주셔서 감사해요.`}
            />
          ) : (
            <FinishTitle
              title={`목표까지 ${achievementRate}% 남았어요!`}
              subTitle={`친구에게 공유해\n계단을 부셔주세요.`}
            />
          )}
        </AnimatePresence>
        <figure className='relative overflow-hidden rounded-2xl'>
          <Image
            src='/images/finish/stairs-finish.svg'
            className={cn(
              'h-full w-full',
              'transition-all duration-300 ease-in-out',
              currentStep === 2 && 'blur-sm'
            )}
            alt=''
            aria-hidden='true'
            width={280}
            height={260}
          />
          <AnimatePresence>
            {currentStep == 2 && (
              <motion.figcaption
                {...fadeAnimation}
                className='absolute inset-0 flex flex-col items-center justify-center'
              >
                <CircularProgress
                  progress={100 - achievementRate}
                  className='absolute'
                />
                <Image
                  src='/images/finish/icon-hammer.svg'
                  alt=''
                  aria-hidden='true'
                  width={50}
                  height={40}
                />
                <p className='text-primary-foreground text-lg font-bold'>
                  지금까지 모인 사진
                </p>
                <CountUp
                  start={0}
                  end={totalImageNum || 0} // TODO: API 응답에 totalImageNum 추가되면 `|| 0` 제거
                  delay={0.4}
                  duration={0.5}
                  className='text-primary-foreground -mt-2.5 text-[4rem] font-bold'
                />
              </motion.figcaption>
            )}
          </AnimatePresence>
        </figure>
      </section>

      {currentStep === 2 && (
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='mb-20 flex w-full flex-col items-center gap-2 px-5 pt-[1.875rem]'
        >
          <h3 className='text-18-semibold'>사진을 모으면 어떤 점이 좋나요?</h3>

          <ol className='list-disc space-y-2 pl-5'>
            <li>
              {`실내 사진을 모을 수록, `}
              <span className='text-primary'>
                실내 접근성을 분석하는 AI모델
              </span>
              을 만드는데 큰 도움이 돼요.
            </li>
            <li>
              AI 모델은 추후 이동약자를 위한 서비스를 운영하는 “계단뿌셔클럽”에
              활용될 예정이에요.
            </li>
          </ol>
        </motion.section>
      )}

      {/* 반원 그라데이션 */}
      {currentStep === 1 && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='relative w-full flex-1'
          >
            <div className='fixed -bottom-18 left-1/2 h-36 w-full -translate-x-1/2 rounded-[50%/100%_100%_0_0] bg-[#ff8a00] opacity-80 blur-[180px]' />
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  );
};

export default FinishStep;
