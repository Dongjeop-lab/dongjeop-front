import { sendGAEvent } from '@/lib/ga';
import { GAEventName, GAEventParams } from '@/types/analytics';

export const uploadAnalytics = {
  /**
   * 업로드 버튼 클릭 (망치 아이콘)
   */
  trackUploadButtonClick: (
    params?: Pick<GAEventParams['UPLOAD'], 'entry_type'>
  ) => {
    sendGAEvent(GAEventName.UPLOAD.BUTTON_CLICK, params);
  },

  /**
   * 업로드 완료
   */
  trackUploadCompleted: (
    params: Required<
      Pick<
        GAEventParams['UPLOAD'],
        'source_type' | 'entry_type' | 'image_key' | 'file_size'
      >
    > &
      Pick<GAEventParams['UPLOAD'], 'landing_path'> // landing_path는 optional (랜딩 페이지를 거치지 않고 직접 진입한 경우 null)
  ) => {
    sendGAEvent(GAEventName.UPLOAD.COMPLETED, params);
  },
};
