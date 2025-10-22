import Image from 'next/image';

const Introduction = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center bg-white'>
      {/* 서브 타이틀 */}
      <header className='flex flex-col items-center gap-6 pt-8'>
        <Image
          src='/images/home/stair-logo.svg'
          alt='계단뿌셔클럽 | Tech For Impact'
          width={215}
          height={33}
        />
        <p className='text-[1rem] leading-[130%] font-semibold tracking-[-1.5%] text-[#686868]'>
          누구나 이동하기 쉬운 세상을 위해
        </p>
      </header>

      <div className='h-4' />

      {/* 메인 타이틀 */}
      <h1 className='text-center text-[1.625rem] leading-[130%] font-bold tracking-[-2%]'>
        이동약자를 위한 AI모델을
        <br />
        함께 완성해 주세요!
      </h1>

      <div className='h-[2rem]' />

      {/* 메인 이미지 */}
      <figure className='px-5'>
        <Image
          src='/images/home/introduction-image.png'
          alt='동접 이벤트 - 실내 사진 업로드로 모두가 함께하는 공간 만들기'
          width={310}
          height={200}
        />
      </figure>

      {/* 참여 방법 안내 */}
      <nav aria-label='이벤트 참여 방법'>
        <ul className='flex flex-col gap-4 px-5 py-10 font-normal text-[#484848]'>
          <li className='flex items-start gap-x-[0.5rem] tracking-[-2%]'>
            <Image
              src='/icons/check-orange.svg'
              width={24}
              height={24}
              alt='icon-check'
              aria-hidden='true'
              className='h-[1.125rem] w-[1.125rem]'
            />
            실내 접근성 정보가 필요한 이유, 퀴즈로 알아볼까요?
          </li>
          <li className='flex items-start gap-x-[0.5rem] tracking-[-2%]'>
            <Image
              src='/icons/check-orange.svg'
              width={24}
              height={24}
              alt='icon-check'
              aria-hidden='true'
              className='mt-0.5 h-[1.125rem] w-[1.125rem]'
            />
            <p>
              실내 사진을 올리고{' '}
              <strong>이동약자를 위한 AI 모델을 만드는 데에 기여</strong>해
              보세요!
            </p>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Introduction;
