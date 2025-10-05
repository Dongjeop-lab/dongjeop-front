import { SOURCE, SourceType } from '@/types/common';

export const getSourceParam = (
  params: Record<string, string | string[] | undefined>
): SourceType => {
  const source = Array.isArray(params.source)
    ? params.source[0]
    : params.source;
  return source === SOURCE.SHARE ? SOURCE.SHARE : SOURCE.NORMAL;
};

export const buildUrlWithServerParams = (
  basePath: string,
  searchParams: { [key: string]: string | string[] | undefined },
  additionalParams?: Record<string, string>
): string => {
  const params = new URLSearchParams();

  // 기존 searchParams 추가
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      const stringValue = Array.isArray(value) ? value[0] : value;
      params.set(key, stringValue);
    }
  });

  // 추가 파라미터가 있으면 추가
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      params.set(key, value);
    });
  }

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};
