import { SOURCE, SourceType } from '@/types/common';

export const getSourceParam = (
  params: Record<string, string | string[] | undefined>
): SourceType => {
  const source = Array.isArray(params.source)
    ? params.source[0]
    : params.source;
  return source === SOURCE.SHARE ? SOURCE.SHARE : SOURCE.NORMAL;
};
