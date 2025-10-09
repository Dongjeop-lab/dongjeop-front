'use client';

interface AchievementBarProps {
  achievementRate: number; // 0~100
}

export const AchievementBar = ({ achievementRate }: AchievementBarProps) => {
  const width = 240;
  const height = 8;
  const clamped = Math.min(Math.max(achievementRate, 0), 100);

  return (
    <svg
      width={width}
      height={height}
      role='progressbar'
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`목표까지 ${clamped}% 남음`}
    >
      {/* 배경 */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill='#fff0CA'
        rx={height / 2}
        ry={height / 2}
      />

      {/* 남은 구간 */}
      <rect
        x={0}
        y={0}
        width={((100 - clamped) / 100) * width}
        height={height}
        rx={height / 2}
        ry={height / 2}
        fill='#ff8221'
      />
    </svg>
  );
};
