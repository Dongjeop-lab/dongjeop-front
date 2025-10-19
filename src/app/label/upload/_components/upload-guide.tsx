import Image from 'next/image';

const guideTexts = [
  {
    icon: '/icons/check-blue.svg',
    text: '공간, 통로, 좌석이 함께 보이는 사진',
  },
  {
    icon: '/icons/x-red.svg',
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
    <section className='flex w-full flex-col items-center bg-[#fff6ed] px-5 py-10'>
      <h2 className='text-18-semibold mb-4'>어떤 사진을 올려야하나요?</h2>

      <ul className='mb-5 flex w-full flex-col items-center'>
        {guideTexts.map(({ icon, text }) => (
          <li
            key={text}
            className='flex items-center gap-x-2'
          >
            <Image
              src={icon}
              alt=''
              aria-hidden='true'
              width={18}
              height={18}
            />
            <p className='text-[#484848]'>{text}</p>
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
            <Image
              src={src}
              alt={`가이드 이미지 ${index + 1}`}
              className='h-full w-full rounded-2xl object-contain'
              width={280}
              height={84}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UploadGuide;
