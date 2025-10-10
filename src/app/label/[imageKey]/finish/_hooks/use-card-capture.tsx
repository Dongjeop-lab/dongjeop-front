import html2canvas from 'html2canvas';
import { RefObject } from 'react';
import { toast } from 'react-toastify';

export const useCardCapture = (ref: RefObject<HTMLElement | null>) => {
  /**
   *
   * @param filename 파일명
   * @returns
   */
  const handleCapture = async (filename = 'capture.png') => {
    if (!ref || !ref.current) {
      toast.error('캡처에 실패했어요. 캡처할 요소를 찾지 못했어요');
      return;
    }

    try {
      const canvas = await html2canvas(ref.current, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      toast.error('캡처에 실패했어요. 오류가 발생했습니다:');
    }
  };

  return { handleCapture };
};
