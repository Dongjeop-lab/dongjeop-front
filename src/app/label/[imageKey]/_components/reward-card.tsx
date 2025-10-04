import Image from 'next/image';

import { cn } from '@/lib/utils';

interface RewardCardProps {
  rank: string;
  title: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCount?: number;
  className?: string;
}

const RewardCard = ({
  rank,
  title,
  imageSrc,
  imageAlt,
  imageCount = 1,
  className,
}: RewardCardProps) => {
  return (
    <article className={cn('w-full max-w-80 py-5', className)}>
      <header className='mb-[8px] text-center'>
        <h3 className='text-info text-center text-[1rem] leading-[1.25rem] font-bold tracking-[0]'>
          {rank}
        </h3>
      </header>

      <p className='mb-[10px] text-center text-[0.8125rem] leading-[100%] font-medium tracking-[-0.03125rem] text-[#696969]'>
        {title}
      </p>

      {imageSrc && (
        <figure className='flex items-center justify-center'>
          {Array.from({ length: imageCount }).map((_, index) => (
            <div
              key={index}
              className='flex items-center'
            >
              <Image
                src={imageSrc}
                alt={imageAlt || ''}
                width={130}
                height={130}
                className='flex h-auto w-24 items-center rounded-full bg-white'
              />
              {index < imageCount - 1 && (
                <span className='text-info mx-1 text-[1.25rem]'>+</span>
              )}
            </div>
          ))}
        </figure>
      )}
    </article>
  );
};

export default RewardCard;
