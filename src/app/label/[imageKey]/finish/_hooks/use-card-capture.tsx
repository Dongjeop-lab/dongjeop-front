import html2canvas from 'html2canvas';
import { RefObject } from 'react';
import { toast } from 'react-toastify';

export const useCardCapture = (ref: RefObject<HTMLDivElement | null>) => {
  /**
   * 카드만 캡처 (배경 없이)
   * @param filename 파일명
   * @returns
   */
  const handleCapture = async (filename = 'capture.png') => {
    if (!ref.current) {
      toast.error('저장 실패! 캡처할 요소를 찾지 못했어요.');
      return;
    }

    try {
      // 폰트 로딩 대기
      if (document.fonts) {
        await document.fonts.ready;
      }

      const canvas = await html2canvas(ref.current, {
        useCORS: true,
        backgroundColor: null,
        scale: window.devicePixelRatio || 2,
        imageTimeout: 15000,
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('저장 성공! 다운로드 폴더에서 확인하세요.');
    } catch (error) {
      console.error(error);
      toast.error('저장 실패! 오류가 발생했습니다.');
    }
  };

  /**
   * 배경 이미지와 함께 카드 캡처 (9:16 비율)
   * @param filename 파일명
   * @param backgroundImageUrl 배경 이미지 URL
   */
  const handleCaptureWithBackground = async (
    filename = 'capture.png',
    backgroundImageUrl: string
  ) => {
    if (!ref.current) {
      toast.error('저장 실패! 캡처할 요소를 찾지 못했어요.');
      return;
    }

    try {
      // 폰트 로딩 대기
      if (document.fonts) {
        await document.fonts.ready;
      }

      const cardCanvas = await html2canvas(ref.current, {
        useCORS: true,
        backgroundColor: null,
        scale: window.devicePixelRatio || 2,
        imageTimeout: 15000,
        logging: false,
      });

      // 9:16 비율의 최종 캔버스 생성
      const finalWidth = 720 * 2;
      const finalHeight = 1280 * 2;
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = finalWidth;
      finalCanvas.height = finalHeight;
      const ctx = finalCanvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context를 가져올 수 없습니다');
      }

      // 배경 이미지 로드 및 그리기
      const backgroundImage = new Image();
      backgroundImage.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {
        backgroundImage.onload = resolve;
        backgroundImage.onerror = reject;
        backgroundImage.src = backgroundImageUrl;
      });

      // 배경 이미지를 캔버스 전체에 그리기
      ctx.drawImage(backgroundImage, 0, 0, finalWidth, finalHeight);

      // 카드 크기 계산
      const cardPadding = 90 * 2;
      const targetCardWidth = finalWidth - cardPadding;
      const targetCardHeight =
        (cardCanvas.height / cardCanvas.width) * targetCardWidth;

      // 그림자 효과 설정
      ctx.shadowColor = 'rgba(255, 110, 0, 0.30)'; // #FF6E004D
      ctx.shadowBlur = 120 * 2; // scale 2
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 12 * 2; // scale 2

      // 카드를 중앙에 배치
      const cardX = (finalWidth - targetCardWidth) / 2;
      const cardY = (finalHeight - targetCardHeight) / 2;
      ctx.drawImage(
        cardCanvas,
        cardX,
        cardY,
        targetCardWidth,
        targetCardHeight
      );

      // 그림자 효과 초기화
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // 다운로드
      const dataUrl = finalCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('저장 성공! 다운로드 폴더에서 확인하세요.');
    } catch (error) {
      console.error(error);
      toast.error('저장 실패! 오류가 발생했습니다.');
    }
  };

  return { handleCapture, handleCaptureWithBackground };
};
