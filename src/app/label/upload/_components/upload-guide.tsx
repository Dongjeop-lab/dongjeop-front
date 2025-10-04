const guideTexts = [
  {
    icon: '/images/upload/check.svg',
    text: '공간, 통로, 좌석이 함께 보이는 사진',
  },
  {
    icon: '/images/upload/x.svg',
    text: '사람, 음식, 천장 등 클로즈업 사진',
  },
];

const guideImages = [
  '/images/upload/upload-guide-1.png',
  '/images/upload/upload-guide-2.png',
  '/images/upload/upload-guide-3.png',
];

const UploadGuide = () => {
  return (
    <section className='my-13 flex w-full flex-col items-center gap-y-5 bg-[#fff6ed] px-5 py-10'>
      <h2 className='text-18-semibold'>어떤 사진을 올려야하나요?</h2>

      <ul className='flex w-full flex-col items-center gap-y-2'>
        {guideTexts.map(({ icon, text }) => (
          <li
            key={text}
            className='flex items-center gap-x-2'
          >
            <img
              src={icon}
              alt=''
              aria-hidden='true'
            />
            <p>{text}</p>
          </li>
        ))}
      </ul>

      {/* 업로드 가이드 이미지 */}
      <ul className='flex min-h-[84px] w-full gap-x-2'>
        {guideImages.map((src, index) => (
          <li
            key={src}
            className='h-full w-full flex-1'
          >
            <img
              src={src}
              alt={`가이드 이미지 ${index + 1}`}
              className='h-full w-full rounded-2xl object-contain'
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UploadGuide;
