import Image from 'next/image';

import NoticeCard from './notice-card';
import RewardCard from './reward-card';

const EventDescription = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center bg-[#EAF3FF] px-5 pt-12 pb-9'>
      {/* 이벤트 라벨 */}
      <header className='mb-4'>
        <div className='flex h-[1.5rem] w-[4.1875rem] items-center justify-center gap-[0.625rem] rounded-[1.25rem] bg-black px-[0.75rem] py-[0.125rem] text-center text-sm font-bold tracking-wide text-white'>
          EVENT
        </div>
      </header>

      {/* 메인 안내 문구 */}
      <article className='mb-9 text-center'>
        <p className='mb-[6px] text-center text-[0.875rem] leading-[1.375rem] font-normal tracking-[-0.03125rem] text-[#000000] opacity-71'>
          모두콘 2025
        </p>
        <h2 className='text-center text-[1.125rem] leading-[1.5rem] font-bold tracking-[-0.03125rem]'>
          사진을 업로드한
          <br />
          <span className='text-info'>20명</span>에게 선물을 드려요
        </h2>
      </article>

      {/* 상품 정보 목록 */}
      <div className='flex w-full flex-col items-center'>
        {/* 1등 상품 */}
        <RewardCard
          rank='1등 상품'
          title={
            <>
              카카오 꿈나라 달나라 춘식이&라이언
              <br />
              무드등 블루투스 스피커
            </>
          }
          firstImageSrc='/images/home/reward-speaker.svg'
          firstImageAlt='무드등 블루투스 스피커'
          className='rounded-t-xl bg-white'
          firstImageSize={{ width: 148, height: 111 }}
        />

        {/* 2등 상품 */}
        <RewardCard
          rank='2등 상품 (3명)'
          title='카카오 미니 손난로 + 보조 배터리'
          firstImageSrc='/images/home/reward-rion.svg'
          secondImageSrc='/images/home/reward-battery.svg'
          firstImageAlt='카카오 미니 손난로'
          secondImageAlt='보조 배터리'
          className='bg-[#F4FAFF]'
          firstImageSize={{ width: 73, height: 86 }}
          secondImageSize={{ width: 56, height: 76 }}
        />

        {/* 7-10등 상품 */}
        <RewardCard
          rank='3등 상품 (16명)'
          title='스타벅스 아이스 카페 아메리카노 T'
          firstImageSrc='/images/home/reward-coffee.svg'
          firstImageAlt='스타벅스 아이스 카페 아메리카노'
          className='rounded-b-xl bg-white'
          firstImageSize={{ width: 52, height: 64 }}
        />

        <NoticeCard title='참여 방법'>
          <ul className='flex flex-col gap-y-2.5 leading-5'>
            <li className='flex items-start gap-x-2 tracking-[-2%]'>
              <Image
                src='/icons/check-orange.svg'
                width={18}
                height={18}
                alt='icon-check'
                aria-hidden='true'
                className='h-[1.125rem] w-[1.125rem]'
              />
              <p className='text-start text-[#484848]'>
                사진 등록 후 <span className='text-[#0D6EF9]'>동접 부스</span>에
                방문해 <span className='text-[#0D6EF9]'>기여카드</span>를
                <br />
                보여주세요.
              </p>
            </li>
            <li className='flex items-start gap-x-2 tracking-[-2%]'>
              <Image
                src='/icons/check-orange.svg'
                width={18}
                height={18}
                alt='icon-check'
                aria-hidden='true'
                className='h-[1.125rem] w-[1.125rem]'
              />
              <p className='text-start text-[#484848]'>
                <span className='text-[#0D6EF9]'>기여카드</span>를 제시하면
                <span className='text-[#0D6EF9]'>제비뽑기</span>에 참여할 수
                있어요.
              </p>
            </li>
          </ul>
        </NoticeCard>
      </div>
    </section>
  );
};

export default EventDescription;
