/* eslint-disable @typescript-eslint/no-explicit-any */
export const sendGAEvent = (
  action: Gtag.EventNames | (string & {}),
  params?: any
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
};
