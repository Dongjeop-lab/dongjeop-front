import { useEffect, useState } from 'react';

import { apiClient } from '@/app/api/client';
import { API_PATH } from '@/lib/path';
import { GetSubmissionResultResponse } from '@/types/api/submission';

export const useSubmissionResult = (imageKey: string) => {
  const [submissionResult, setSubmissionResult] =
    useState<GetSubmissionResultResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<GetSubmissionResultResponse>(
          `${API_PATH.FINISH}/${imageKey}`
        );

        if (response.success && response.data) {
          setSubmissionResult(response.data);
        } else {
          console.error('API 요청 실패:', response.error);
          setError(response.error || '데이터를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        console.error('Failed to fetch result:', err);
        setError('네트워크 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [imageKey]);

  return { submissionResult, loading, error };
};
