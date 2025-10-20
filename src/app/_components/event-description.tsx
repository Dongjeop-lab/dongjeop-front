import Image from 'next/image';

import NoticeCard from './notice-card';
import RewardCard from './reward-card';

const EventDescription = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center bg-[#EAF3FF] px-5 pt-12'>
      {/* 이벤트 라벨 */}
      <header className='mb-4'>
        <div className='flex h-[1.5rem] w-[4.1875rem] items-center justify-center gap-[0.625rem] rounded-[1.25rem] bg-black px-[0.75rem] py-[0.125rem] text-center text-sm font-bold tracking-wide text-white'>
          EVENT
        </div>
      </header>

      {/* 이벤트 기간 */}
      <time
        className='mb-1.5 text-center text-[0.875rem] leading-[1.375rem] font-normal tracking-[-0.03125rem] text-gray-600'
        dateTime='2024-10-15/2024-11-14'
      >
        10월 15일~11월 14일 동안
      </time>

      {/* 메인 안내 문구 */}
      <article className='mb-9 text-center'>
        <h2 className='text-center text-[1.125rem] leading-[1.5rem] font-bold tracking-[-0.03125rem]'>
          사진을 업로드한 참여자 중
          <br />
          <span className='text-info'>상위 10명에게</span> 굿즈를 드려요
        </h2>
      </article>

      {/* 상품 정보 목록 */}
      <div className='flex w-full flex-col items-center'>
        {/* 1-3등 상품 */}
        <RewardCard
          rank='1-3등 상품'
          title='카카오 프렌즈 피규어 조명 + 계단뿌셔클럽 양말'
          firstImageSrc='/images/home/event-reward-image1.svg'
          secondImageSrc='/images/home/event-reward-image4.svg'
          firstImageAlt='카카오 프렌즈 피규어 조명'
          secondImageAlt='계단뿌셔클럽 양말'
          className='rounded-t-xl bg-white'
        />

        {/* 4-6등 상품 */}
        <RewardCard
          rank='4-6등 상품'
          title='카카오 오덴세 텀블러 + 계단뿌셔클럽 양말'
          firstImageSrc='/images/home/event-reward-image2.svg'
          secondImageSrc='/images/home/event-reward-image4.svg'
          firstImageAlt='카카오 오덴세 텀블러'
          secondImageAlt='계단뿌셔클럽 양말'
          className='bg-[#F4FAFF]'
        />

        {/* 7-10등 상품 */}
        <RewardCard
          rank='7-10등 상품'
          title='카카오 키링 인형 + 계단뿌셔클럽 양말'
          firstImageSrc='/images/home/event-reward-image3.svg'
          secondImageSrc='/images/home/event-reward-image4.svg'
          firstImageAlt='카카오 키링 인형'
          secondImageAlt='계단뿌셔클럽 양말'
          className='rounded-b-xl bg-white'
        />

        <p className='text-14-regular my-3 text-[#00000050]'>
          굿즈는 이벤트 진행에 따라 변경될 수 있습니다
        </p>

        <NoticeCard title='참여 방법 및 지급 일정'>
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
                사진 등록 시{' '}
                <span className='text-[#0D6EF9]'>
                  전화번호를 입력한 경우에 한해
                </span>
                <br />
                참여로 인정됩니다.
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
                이벤트 기간 종료 후{' '}
                <span className='text-[#0D6EF9]'>11월 20일</span>에 기재한
                <br />
                연락처로 개별 안내 드려요.
              </p>
            </li>
          </ul>
        </NoticeCard>
      </div>
      <div className='flex flex-col items-center gap-5 pt-[66px]'>
        <Image
          src='/images/home/footer-logo.svg'
          alt='Kakao, 계단뿌셔클럽, Tech For Impact'
          width={290}
          height={20}
        />
        <span className='text-center text-xs leading-4 opacity-50'>
          본 서비스는 카카오임팩트와 계단뿌셔클럽의 지원,
          <br />
          테크포임팩트 커뮤니티의 기여로 개발되었습니다.
        </span>
      </div>
    </section>
  );
};

export default EventDescription;
