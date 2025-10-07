'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';
import { EntryType, ImageSourceType } from '@/types/api/upload';

import { useImageUpload } from '../_hooks/use-image-upload';
import UploadGuide from './upload-guide';

interface UploadContainerProps {
  entryType: EntryType;
}

const UploadContainer = ({ entryType }: UploadContainerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sourceType, setSourceType] = useState<ImageSourceType>(
    ImageSourceType.GALLERY
  );

  const {
    selectedImage,
    imagePreview,
    handleImageChange,
    handleImageReset,
    handleImageUpload,
  } = useImageUpload(sourceType, entryType);

  const openImagePicker = () => {
    if (imagePreview) return;
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (!selectedImage) {
      setSourceType(ImageSourceType.GALLERY);
      return;
    }

    const now = Date.now();
    const lastModified = selectedImage.lastModified;
    const timeDiff = now - lastModified;

    // lastModified 기준 2분 이내면 카메라 촬영, 그 외는 갤러리 선택으로 판단
    const detectedSource =
      timeDiff < 2 * 60 * 1000
        ? ImageSourceType.CAMERA
        : ImageSourceType.GALLERY;

    setSourceType(detectedSource);
  }, [selectedImage]);

  return (
    <div className='flex min-h-screen w-full'>
      <main className='flex flex-col items-center justify-center pb-14'>
        {/* 사진 등록 섹션 */}
        <section className='flex w-full max-w-[360px] flex-1 flex-col items-center justify-center gap-y-8 px-5 pt-11 pb-10'>
          <h1 className='text-26-bold text-center'>
            실내 사진을 등록해
            <br />
            계단을 함께 부셔요!
          </h1>
          <p className='text-18-medium text-muted'>
            망치를 눌러 사진을 올려주세요
          </p>

          <div
            className={`relative overflow-hidden rounded-2xl ${
              imagePreview ? '' : 'cursor-pointer'
            }`}
            onClick={openImagePicker}
          >
            {imagePreview ? (
              <div className='relative'>
                <Image
                  src={imagePreview}
                  alt='선택된 사진 미리보기'
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='h-auto max-h-[280px] w-auto rounded-2xl object-contain'
                  unoptimized
                />
                <button
                  type='button'
                  className='absolute top-2 right-2 cursor-pointer'
                  onClick={handleImageReset}
                  aria-label='사진 선택 취소'
                >
                  <Image
                    src='/images/upload/close.svg'
                    alt=''
                    aria-hidden='true'
                    width={32}
                    height={32}
                  />
                </button>
              </div>
            ) : (
              <>
                <Image
                  src='/images/upload/stairs-upload.svg'
                  alt=''
                  aria-hidden='true'
                  width={280}
                  height={260}
                />
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                  <Image
                    src='/images/upload/icon-hammer.svg'
                    alt=''
                    aria-hidden='true'
                    width={140}
                    height={140}
                  />
                  <Image
                    src='/images/upload/tooltip.svg'
                    alt=''
                    aria-hidden='true'
                    width={67.4}
                    height={39.53}
                  />
                </div>
              </>
            )}

            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
              aria-label='사진 선택'
            />
          </div>
        </section>

        {/* 사진 가이드 섹션 */}
        <UploadGuide />
      </main>

      {/* 하단 CTA 버튼 */}
      <BottomCTA>
        <BottomCTA.Button
          variant={'primary'}
          disabled={!selectedImage}
          onClick={handleImageUpload}
        >
          1분 만에 등록하기
        </BottomCTA.Button>
      </BottomCTA>
    </div>
  );
};

export default UploadContainer;
