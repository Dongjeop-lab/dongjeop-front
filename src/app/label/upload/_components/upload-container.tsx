'use client';
import Image from 'next/image';
import { useRef } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';
import { SourceType } from '@/types/common';

import UploadGuide from '../../../../features/upload/components/upload-guide';
import { useImageUpload } from '../../../../features/upload/hooks/use-image-upload';

interface UploadContainerProps {
  source: SourceType;
}

// TODO: API 요청 시 헤더 또는 바디에 source 포함시키기
const UploadContainer = (_props: UploadContainerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    selectedImage,
    imagePreview,
    handleImageChange,
    handleImageReset,
    handleImageUpload,
  } = useImageUpload();

  const openImagePicker = () => {
    if (imagePreview) return;
    fileInputRef.current?.click();
  };

  return (
    <div className='h-screen w-full'>
      <main
        className='flex flex-col items-center justify-center'
        style={{ minHeight: 'calc(100vh - 56px)' }}
      >
        {/* 사진 등록 섹션 */}
        {/* XXX: Status bar 높이까지 section의 padding-top에 포함한 상태 */}
        <section className='flex w-[360px] flex-1 flex-col items-center justify-center gap-y-8 px-5 pt-24 pb-10'>
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
                <img
                  src={imagePreview}
                  alt='선택된 사진 미리보기'
                  className='max-w-[280px] object-cover'
                />
                <button
                  type='button'
                  className='absolute top-2 right-2 cursor-pointer'
                  onClick={handleImageReset}
                  aria-label='사진 선택 취소'
                >
                  <img
                    src='/images/upload/close.svg'
                    alt=''
                    aria-hidden='true'
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
                  <img
                    src='/images/common/icon-hammer.svg'
                    alt=''
                    aria-hidden='true'
                  />
                  <img
                    src='/images/upload/tooltip.svg'
                    alt=''
                    aria-hidden='true'
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
        {!selectedImage ? (
          <BottomCTA.Button
            variant='secondary'
            disabled
            className='!bg-secondary !text-secondary-foreground'
          >
            1분 만에 등록하기
          </BottomCTA.Button>
        ) : (
          <BottomCTA.Button
            variant='primary'
            onClick={handleImageUpload}
          >
            1분 만에 등록하기
          </BottomCTA.Button>
        )}
      </BottomCTA>
      <BottomCTA>
        <BottomCTA.Button
          variant={selectedImage ? 'primary' : 'secondary'}
          disabled={!selectedImage}
          className={
            selectedImage ? '' : '!bg-secondary !text-secondary-foreground'
          }
        >
          1분 만에 등록하기
        </BottomCTA.Button>
      </BottomCTA>
    </div>
  );
};

export default UploadContainer;
