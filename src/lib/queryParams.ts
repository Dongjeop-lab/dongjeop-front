import { ReadonlyURLSearchParams } from 'next/navigation';

import { ENTRY_QUERY } from '@/lib/path';
import { EntryType } from '@/types/api/upload';

export const getEntryTypeParam = (
  params: Record<string, string | string[] | undefined>
): EntryType => {
  const entry = Array.isArray(params.entry) ? params.entry[0] : params.entry;
  return entry === ENTRY_QUERY.VALUE ? EntryType.SHARE : EntryType.NORMAL;
};

/**
 * @param basePath 기본 경로
 * @param searchParams useSearchParams()에서 반환된 객체
 * @param additionalParams 추가할 파라미터들
 * @returns 완성된 URL 문자열
 */
export const buildUrlWithSearchParams = (
  basePath: string,
  searchParams: ReadonlyURLSearchParams,
  additionalParams?: Record<string, string>
): string => {
  const params = new URLSearchParams(searchParams.toString());

  // 추가 파라미터가 있으면 기존 파라미터에 추가
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      params.set(key, value);
    });
  }

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};
