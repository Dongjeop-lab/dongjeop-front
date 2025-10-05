import Image from 'next/image';

interface FinishStep2Props {
  achievementRate: number;
  totalImageNum: number;
}

const FinishStep2 = ({ achievementRate, totalImageNum }: FinishStep2Props) => {
  return (
    <>
      <section className='flex w-[360px] flex-1 flex-col items-center justify-center px-12.5 pt-11'>
        <div className='flex flex-col items-center gap-y-2.5 pt-7.5 pb-5'>
          <p className='text-18-semibold text-primary'>
            목표까지 {achievementRate}% 남았어요!
          </p>
          <h2 className='text-26-bold text-center'>
            친구에게 공유해
            <br />
            계단을 부셔주세요.
          </h2>
        </div>

        <figure className={`relative my-7.5 overflow-hidden rounded-2xl`}>
          <Image
            src='/images/finish/stairs-finish-2.svg'
            className='blur-md'
            alt=''
            aria-hidden='true'
            width={280}
            height={260}
          />
          <figcaption className='absolute inset-0 flex flex-col items-center justify-center'>
            {/* TODO: 링 추가 */}
            <Image
              src='/images/finish/icon-hammer.svg'
              alt=''
              aria-hidden='true'
              width={50}
              height={40}
            />
            <p className='text-18-bold text-primary-foreground'>
              지금까지 모인 사진
            </p>
            <p className='text-primary-foreground text-[4rem] leading-normal font-bold tracking-[-0.02em]'>
              {totalImageNum}
            </p>
          </figcaption>
        </figure>
      </section>

      <section className='mb-14 flex w-full flex-col items-center gap-y-2 px-5 py-7.5'>
        <h3 className='text-18-semibold'>사진을 모으면 어떤 점이 좋나요?</h3>

        <ul className='list-disc space-y-2 pl-5'>
          <li>
            실내 사진을 모을 수록,{' '}
            <span className='text-primary'>실내 접근성을 분석하는 AI모델</span>
            을 만드는데 큰 도움이 돼요.
          </li>
          <li>
            AI 모델은 추후 이동약자를 위한 서비스를 운영하는 “계단뿌셔클럽”에
            활용될 예정이에요.
          </li>
        </ul>
      </section>
    </>
  );
};

export default FinishStep2;
