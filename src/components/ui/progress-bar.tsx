import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number; // 0에서 100 사이의 값
  className?: string; // 전체 ProgressBar의 클래스명
  trackClassName?: string; // 트랙(배경)의 클래스명
  indicatorClassName?: string; // 인디케이터(채워진 부분)의 클래스명
}

const ProgressBar = ({
  progress,
  className = 'w-[240px] h-3',
  trackClassName = 'bg-[#B3BFCE24]',
  indicatorClassName = 'bg-orange',
}: ProgressBarProps) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  return (
    <div
      className={cn(
        `relative overflow-hidden rounded-full`,
        trackClassName,
        className
      )}
    >
      <div
        className={cn(`h-full rounded-full`, indicatorClassName)}
        style={{ width: `${clampedProgress}%` }}
        role='progressbar'
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};

export default ProgressBar;
