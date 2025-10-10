'use client';

import Lottie from 'lottie-react';

import confettiAnimation from '../_assets/Confetti.json';

export const ConfettiAnimation = () => {
  return (
    <Lottie
      animationData={confettiAnimation}
      loop={false}
      autoplay
      style={{
        width: 450,
        height: 450,
        pointerEvents: 'none',
      }}
    />
  );
};
