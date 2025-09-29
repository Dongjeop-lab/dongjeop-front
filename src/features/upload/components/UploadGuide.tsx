const guideImages = [
  '/images/upload/upload-guide-1.png',
  '/images/upload/upload-guide-2.png',
  '/images/upload/upload-guide-3.png',
];

const UploadGuide = () => {
  return (
    <section className='my-13 flex w-full flex-col items-center gap-y-5 bg-[#fff6ed] px-5 py-10'>
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
      <div className='flex min-h-[84px] w-full gap-x-2'>
        {guideImages.map((src, index) => (
          <div
            key={src}
            className='h-full w-full flex-1'
          >
            <img
              src={src}
              alt={`가이드 이미지 ${index + 1}`}
              className='h-full w-full rounded-2xl object-contain'
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default UploadGuide;
