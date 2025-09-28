import { SOURCE, SourceType } from '@/types/common';

export const getSourceParam = (
  params: Record<string, string | string[] | undefined>
): SourceType => {
  return params.source === SOURCE.SHARE ? SOURCE.SHARE : SOURCE.NORMAL;
};
