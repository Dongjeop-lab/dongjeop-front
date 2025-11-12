import { sendGAEvent, setGAUserProperty } from '@/lib/ga';
import { GAEventName, GAEventParams } from '@/types/analytics';

export const landingAnalytics = {
  /**
   * 랜딩 페이지 CTA 클릭
   */
  trackCTAClick: (params: GAEventParams['LANDING']) => {
    // 이벤트 전송
    sendGAEvent(GAEventName.LANDING.CTA_CLICK, params);

    // User Property 설정
    const journey = params.cta_type === 'quiz' ? 'quiz' : 'direct';
    setGAUserProperty({ landing_journey: journey });
  },
};
