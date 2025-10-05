import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/app/api/client';
import { API_PATH } from '@/lib/path';
import { GetSubmissionResultResponse } from '@/types/api/submission';

export const useSubmissionResult = (imageKey: string) => {
  const {
    data: submissionResult,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['submissionResult', imageKey],
    queryFn: async () => {
      const response = await apiClient.get<GetSubmissionResultResponse>(
        `${API_PATH.FINISH}/${imageKey}`
      );

      if (!response.success || !response.data) {
        // apiClient가 HTTP 에러(404, 500)나 네트워크 에러를 모두 response.error에 담아줌
        throw new Error(response.error || '기여 결과 조회에 실패했습니다.');
      }

      return response.data;
    },
    retry: 1,
    staleTime: 0,
    gcTime: 0,
  });

  return {
    submissionResult,
    loading,
    error: error ? (error as Error).message : null,
  };
};
