import { motion } from 'motion/react';
import Image from 'next/image';

const QuizStep2Explanation = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    }}
    className='flex h-full flex-col items-center gap-11'
  >
    <h1 className='text-22-bold leading-[130%]'>정답을 같이 살펴볼까요?</h1>

    <div className='flex flex-col justify-center'>
      <Image
        src='/images/quiz/quiz2-bg.png'
        alt='이동약자에게 불편할 수 있는 요소 3개가 포함된 이미지'
        width={360}
        height={540}
      />
      <div className='h-[5.9375rem] w-[22.5rem] bg-[#FFF2D5]'></div>
    </div>

    {/* TODO: 해설 컴포넌트 추가 (fixed) */}
    {/* TODO: 세번째 해설 컴포넌트에 달린 > 아이콘에 onNext 연결 */}
  </motion.div>
);

export default QuizStep2Explanation;
