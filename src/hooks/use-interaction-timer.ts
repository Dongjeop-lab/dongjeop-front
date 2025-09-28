import { useCallback, useEffect, useRef } from 'react';

const useInteractionTimer = () => {
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = performance.now();
  }, []);

  const end = useCallback((): number | null => {
    if (startTimeRef.current === null) {
      console.warn('useInteractionTimer: 타이머가 시작되지 않았습니다.');
      return null;
    }

    const endTime = performance.now();
    const duration = endTime - startTimeRef.current;

    startTimeRef.current = null;

    return duration;
  }, []);

  return { endTimer: end };
};

export default useInteractionTimer;
