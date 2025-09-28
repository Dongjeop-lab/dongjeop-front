import Image from 'next/image';

import BottomCTA from '@/components/ui/bottom-cta';
import { SourceType } from '@/types/common';

interface UploadContainerProps {
  source: SourceType;
}

const guideImages = [
  '/images/upload/upload-guide-1.svg',
  '/images/upload/upload-guide-2.svg',
  '/images/upload/upload-guide-3.svg',
];

const UploadContainer = ({ source }: UploadContainerProps) => {
  // TODO: API 요청 시 헤더 또는 바디에 source 포함시키기

  return (
    <div className='h-screen w-full'>
      <main
        className='flex flex-col items-center justify-center'
        style={{ minHeight: 'calc(100vh - 56px)' }}
      >
        {/* 사진 등록 섹션 */}
        {/* XXX: Status bar 높이까지 section의 padding-top에 포함한 상태 */}
        <section className='flex w-[360px] flex-col items-center justify-center gap-y-8 px-5 pt-24 pb-10'>
          <h1 className='text-26-bold text-center'>
            실내 사진을 등록해
            <br />
            계단을 함께 부셔요!
          </h1>
          <p className='text-18-medium text-[#727272]'>
            망치를 눌러 사진을 올려주세요
          </p>

          {/* 사진 선택 터치 영역 */}
          <div className='relative'>
            <Image
              src='/images/stairs-upload.svg'
              alt='Image Upload Button'
              width={280}
              height={260}
              className='rounded-2xl'
            />

            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <img
                src='/images/upload/icon-hammer.svg'
                alt=''
                aria-hidden='true'
              />
              <img
                src='/images/upload/tooltip.svg'
                alt=''
                aria-hidden='true'
              />
            </div>
          </div>
        </section>

        {/* 사진 가이드 섹션 */}
        <section className='flex w-full flex-col items-center gap-y-5 bg-[#fff6ed] px-5 pt-10 pb-7.5'>
          <p className='text-18-semibold'>어떤 사진을 올려야하나요?</p>

          <div className='flex w-full flex-col items-center gap-y-2'>
            <div className='flex items-center gap-x-2'>
              <img
                src='/images/upload/check.svg'
                alt=''
                aria-hidden='true'
              />
              <p>공간, 통로, 좌석이 함께 보이는 사진</p>
            </div>

            <div className='flex items-center gap-x-2'>
              <img
                src='/images/upload/x.svg'
                alt=''
                aria-hidden='true'
              />
              <p>사람, 음식, 천장 등 클로즈업 사진</p>
            </div>
          </div>

          {/* 업로드 가이드 이미지 */}
          <div className='flex min-h-[84px] w-full gap-x-0.5'>
            {guideImages.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Guide Image ${index + 1}`}
                className='h-full flex-1 object-contain'
              />
            ))}
          </div>
        </section>
      </main>

      {/* 하단 CTA 버튼 */}
      {/* TODO: 이미지 등록 여부에 따라 조건부 렌더링 */}
      <BottomCTA>
        {/* 이미지 미등록시 */}
        <BottomCTA.Button
          variant='secondary'
          disabled
          className='!bg-secondary !text-secondary-foreground'
        >
          1분 만에 등록하기
        </BottomCTA.Button>

        {/* 이미지 등록시 */}
        {/* <BottomCTA.Button variant='primary'>1분 만에 등록하기</BottomCTA.Button> */}
      </BottomCTA>
    </div>
  );
};

export default UploadContainer;
