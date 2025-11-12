/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * GA 이벤트 전송
 */
export const sendGAEvent = (
  action: Gtag.EventNames | (string & {}),
  params?: any
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
};

/**
 * GA User Property 설정
 */
export const setGAUserProperty = (properties: Record<string, string>) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('set', 'user_properties', properties);
  }
};
