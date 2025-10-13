import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { API_PATH, BROWSER_PATH } from '@/lib/path';
import {
  EntryType,
  ImageSourceType,
  PostImageResponse,
} from '@/types/api/upload';

interface UseImageUploadReturn {
  selectedImage: File | null;
  imagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageReset: () => void;
  handleImageUpload: () => Promise<void>;
}

export const useImageUpload = (
  sourceType: ImageSourceType | null,
  entryType: EntryType
): UseImageUploadReturn => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 크기 검증 (10MB 제한)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('파일 크기가 너무 큽니다. 10MB 이하의 파일을 선택해 주세요');
      return;
    }

    // 이미지 파일 타입 체크
    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      if (result) setImagePreview(result);
    };

    reader.onerror = () => {
      toast.error('이미지를 불러오는 중 오류가 발생했습니다.');
      setSelectedImage(null);
      setImagePreview(null);
    };

    reader.readAsDataURL(file);

    // input value 초기화 (같은 파일 재선택 가능)
    event.target.value = '';
  };

  const handleImageReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      const formData = new FormData();
      formData.append('image_file', selectedImage);

      const uploadSourceType = sourceType ?? ImageSourceType.GALLERY;
      formData.append('source_type', uploadSourceType.toString());

      formData.append('entry_type', entryType.toString());
      formData.append('file_name', selectedImage.name);
      formData.append('terms_agreed', 'true'); // TODO: 실제 동의 여부로 교체
      formData.append('privacy_agreed', 'true'); // TODO: 실제 동의 여부로 교체

      const response = await fetch(`${API_PATH.UPLOAD}`, {
        method: 'POST',
        body: formData,
      });

      const data: PostImageResponse = await response.json();

      if (!response.ok) {
        console.error('업로드 실패:', data);
        return;
      }

      router.push(BROWSER_PATH.LABEL.LABELING(data.image_key));
    } catch (error) {
      console.log(error, '업로드 실패');
    }
  };

  return {
    selectedImage,
    imagePreview,
    handleImageChange,
    handleImageReset,
    handleImageUpload,
  };
};
