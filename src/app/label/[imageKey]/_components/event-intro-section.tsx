import NoticeCard from './notice-card';
import RewardCard from './reward-card';

const EventIntroSection = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center bg-[#EAF3FF] px-5 py-12'>
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
          title='카카오 미니 인형 + 계단뿌셔클럽 양말'
          imageSrc='/images/home/event-reward-image.png'
          imageAlt='카카오 미니 인형'
          imageCount={2}
          className='rounded-t-xl bg-white'
        />

        {/* 4-6등 상품 */}
        <RewardCard
          rank='4-6등 상품'
          title='카카오 키링 + 계단뿌셔클럽 양말'
          imageSrc='/images/home/event-reward-image.png'
          imageAlt='카카오 키링'
          imageCount={2}
          className='bg-[#FFF9F4]'
        />

        {/* 7-10등 상품 */}
        <RewardCard
          rank='7-10등 상품'
          title='노플라스틱 키링'
          imageSrc='/images/home/event-reward-image.png'
          imageAlt='노플라스틱 키링'
          imageCount={1}
          className='rounded-b-xl bg-white'
        />

        <div className='h-3' />

        <NoticeCard title='지급 일정'>
          <p className='text-secondary-foreground text-center text-[0.875rem] leading-[100%] font-medium tracking-[-0.03125rem]'>
            활동 기간 종료 후 11월 20일에
            <br />
            기재한 연락처로 개별 안내 드려요
          </p>
        </NoticeCard>

        <div className='h-3' />

        <NoticeCard title='개인정보 수집 및 이용'>
          <p className='text-secondary-foreground text-center text-[0.875rem] leading-[100%] font-medium tracking-[-0.03125rem]'>
            개인정보 수집 이용은
            <br />첫 화면에서 동의하신 범위 내에만 처리됩니다.
          </p>

          <button
            type='button'
            className='mt-2.5 text-center text-[0.875rem] leading-[100%] font-medium tracking-[-0.03125rem] text-[#838C95] underline decoration-solid underline-offset-0'
          >
            자세히보기
          </button>
        </NoticeCard>
      </div>
    </section>
  );
};

export default EventIntroSection;
