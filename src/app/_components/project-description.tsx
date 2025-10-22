import Image from 'next/image';

import QuoteSection from './quote-section';
import StepItem from './step-item';

const ProjectDescription = () => {
  return (
    <section
      className='flex w-full flex-col items-center justify-center bg-[#FFF9EF] px-5 py-12'
      aria-labelledby='project-description-title'
    >
      <div className='flex w-full max-w-md flex-col items-center'>
        {/* 프로젝트 소개 라벨 */}
        <header className='mb-4'>
          <div className='flex h-6 items-center justify-center rounded-full border border-[#FFC691] bg-white px-3 py-0.5'>
            <span className='tracking-0 text-[13px] leading-[20px] font-bold text-[#FF7F1C]'>
              프로젝트 소개
            </span>
          </div>
        </header>

        {/* 메인 제목 */}
        <hgroup className='mb-9 text-center'>
          <h2
            id='project-description-title'
            className='text-18-bold mb-2 leading-[1.5]'
          >
            이동약자들의 이동을 막는 건
            <br />
            바로 정보의 부족이에요
          </h2>
        </hgroup>

        {/* 인용구 섹션들 */}
        <aside
          className='mb-[70px] flex w-full flex-col items-center gap-9'
          aria-label='사용자 의견'
        >
          <QuoteSection
            imageSrc='/images/home/person-image1.svg'
            imageAlt='사람 일러스트 1'
            imagePosition='left'
          >
            &quot;식당을 찾을 때 쓰는{' '}
            <span className='text-14-semibold'>지도 서비스</span>에는{' '}
            <span className='text-14-semibold'>
              이동약자에게 필요한 정보가 부족하거나 부정확
            </span>
            해요.&quot;
          </QuoteSection>

          <QuoteSection
            imageSrc='/images/home/person-image2.svg'
            imageAlt='사람 일러스트 2'
            imagePosition='right'
          >
            &quot;외부에서 식사를 할 때마다 휠체어로 갈 수 있는 곳인지{' '}
            <span className='text-14-semibold'>문의하거나 미리 답사</span>
            해야 하는 것이 <span className='text-14-semibold'>불합리</span>한 것
            같아요.&quot;
          </QuoteSection>
        </aside>

        {/* 하이라이트 섹션 */}
        <section
          className='mb-[22px] flex items-start justify-center gap-2'
          aria-labelledby='highlight-title'
        >
          <Image
            src='/icons/star.svg'
            width={24}
            height={24}
            alt='별 아이콘'
            className='mt-[3px] h-6 w-6'
            aria-hidden='true'
          />

          <h3
            id='highlight-title'
            className='text-18-bold text-center leading-[24px]'
          >
            <span className='rounded bg-orange-100 p-0.5 text-[#F66B00]'>
              실내 사진 100장
            </span>
            만 모여도
            <span className='block'>더 정확한 정보를 제공할 수 있어요</span>
          </h3>

          <Image
            src='/icons/star.svg'
            width={24}
            height={24}
            alt='별 아이콘'
            className='mt-[3px] h-6 w-6'
            aria-hidden='true'
          />
        </section>

        {/* 단계 설명 */}
        <section aria-labelledby='process-title'>
          <h3
            id='process-title'
            className='sr-only'
          >
            AI 모델 제작 과정
          </h3>
          <ol className='flex w-full flex-col gap-4'>
            <li>
              <StepItem
                icon='/images/home/camera-image.svg'
                title='식당/카페의 실내 전경 사진을 업로드하면'
              />
            </li>

            <li>
              <StepItem
                icon='/images/home/wheelchair-image.svg'
                title='계단, 의자 형태, 통로 폭 등을 분석하여'
              />
            </li>

            <li>
              <StepItem
                icon='/images/home/reading-glasses-image.svg'
                title={`이동약자를 위한 접근성 정보를 제공하는\nAI 모델을 제작해요`}
              />
            </li>
          </ol>
        </section>
      </div>
    </section>
  );
};

export default ProjectDescription;
