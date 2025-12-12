import Image from 'next/image';

import { cn } from '@/lib/utils';

interface RewardCardProps {
  rank: string;
  title: React.ReactNode;
  firstImageSrc: string;
  secondImageSrc?: string;
  firstImageAlt: string;
  secondImageAlt?: string;
  className?: string;
  firstImageSize?: {
    width: number;
    height: number;
  };
  secondImageSize?: {
    width: number;
    height: number;
  };
}

const RewardCard = ({
  rank,
  title,
  firstImageSrc,
  secondImageSrc,
  firstImageAlt,
  secondImageAlt,
  className,
  firstImageSize = { width: 96, height: 96 }, // 기본값 w-24 (96px)
  secondImageSize = { width: 96, height: 96 }, // 기본값 w-24 (96px)
}: RewardCardProps) => {
  return (
    <article className={cn('w-full max-w-80 py-5', className)}>
      <header className='mb-[8px] text-center'>
        <h3 className='text-info text-center text-[1rem] leading-[1.25rem] font-bold tracking-[0]'>
          {rank}
        </h3>
      </header>

      <p className='mb-4 text-center text-[0.8125rem] leading-[1.3] font-medium tracking-[-0.03125rem] whitespace-pre-line text-[#696969]'>
        {title}
      </p>

      <figure className='flex items-center justify-center'>
        <div className='flex items-center gap-2'>
          <div className='flex h-[130px] w-[130px] items-center justify-center rounded-full bg-white'>
            <Image
              src={firstImageSrc}
              alt={firstImageAlt}
              width={firstImageSize.width}
              height={firstImageSize.height}
              className='h-auto'
              style={{
                width: `${firstImageSize.width}px`,
                height: `${firstImageSize.height}px`,
              }}
            />
          </div>

          {secondImageSrc && secondImageAlt && (
            <>
              <span className='text-info text-[1.25rem]'>+</span>
              <div className='flex h-[130px] w-[130px] items-center justify-center rounded-full bg-white'>
                <Image
                  src={secondImageSrc}
                  alt={secondImageAlt}
                  width={secondImageSize.width}
                  height={secondImageSize.height}
                  className='h-auto'
                  style={{
                    width: `${secondImageSize.width}px`,
                    height: `${secondImageSize.height}px`,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </figure>
    </article>
  );
};

export default RewardCard;
