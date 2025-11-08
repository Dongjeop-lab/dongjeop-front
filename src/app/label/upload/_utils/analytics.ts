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
    >
  ) => {
    sendGAEvent(GAEventName.UPLOAD.COMPLETED, params);
  },
};
