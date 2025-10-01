'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface CircularProgressProps {
  progress: number;
  strokeWidth?: number;
  size?: number;
  trackColor?: string;
  progressColor?: string;
  className?: string;
}

export const CircularProgress = ({
  progress,
  className,
  strokeWidth = 10,
  size = 200,
  trackColor = '#FF6E00',
  progressColor = '#FFFFFF',
}: CircularProgressProps) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference * (1 - progress / 100);

  return (
    <svg
      width={size}
      height={size}
      className={cn('-rotate-90', className)}
    >
      {/* 배경이 되는 링 */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill='transparent'
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />
      {/* 퍼센트에 따라 채워지는 링 */}
      <motion.circle
        cx={center}
        cy={center}
        r={radius}
        fill='transparent'
        stroke={progressColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        strokeLinecap='round'
        animate={{
          strokeDashoffset: offset,
        }}
        transition={{
          delay: 0.3,
          duration: 0.5,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
};
