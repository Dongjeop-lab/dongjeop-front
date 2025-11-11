import { sendGAEvent } from '@/lib/ga';
import { GAEventName, GAEventParams } from '@/types/analytics';

export const landingAnalytics = {
  /**
   * 랜딩 페이지 CTA 클릭
   */
  trackCTAClick: (params: GAEventParams['LANDING']) => {
    sendGAEvent(GAEventName.LANDING.CTA_CLICK, params);
  },
};
