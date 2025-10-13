import Image from 'next/image';

import { cn } from '@/lib/utils';

interface RewardCardProps {
  rank: string;
  title: string;
  firstImageSrc: string;
  secondImageSrc: string;
  firstImageAlt: string;
  secondImageAlt: string;
  className?: string;
}

const RewardCard = ({
  rank,
  title,
  firstImageSrc,
  secondImageSrc,
  firstImageAlt,
  secondImageAlt,
  className,
}: RewardCardProps) => {
  return (
    <article className={cn('w-full max-w-80 py-5', className)}>
      <header className='mb-[8px] text-center'>
        <h3 className='text-info text-center text-[1rem] leading-[1.25rem] font-bold tracking-[0]'>
          {rank}
        </h3>
      </header>

      <p className='mb-4 text-center text-[0.8125rem] leading-[100%] font-medium tracking-[-0.03125rem] text-[#696969]'>
        {title}
      </p>

      <figure className='flex items-center justify-center'>
        <div className='flex items-center'>
          <Image
            src={firstImageSrc}
            alt={firstImageAlt}
            width={130}
            height={130}
            className='flex h-auto w-24 items-center rounded-full bg-white'
          />

          <span className='text-info mx-1 text-[1.25rem]'>+</span>

          <Image
            src={secondImageSrc}
            alt={secondImageAlt}
            width={130}
            height={130}
            className='flex h-auto w-24 items-center rounded-full bg-white'
          />
        </div>
      </figure>
    </article>
  );
};

export default RewardCard;
