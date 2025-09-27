export interface ClassName {
  className?: string;
}

export const SOURCE = {
  NORMAL: 'normal',
  SHARE: 'share',
} as const;

export type SourceType = (typeof SOURCE)[keyof typeof SOURCE];
