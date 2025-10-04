import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/app/api/client';
import { API_PATH } from '@/lib/path';
import { UpdateLabelRequestBody } from '@/types/api/label';

interface UseUpdateLabelParams {
  imageKey: string;
  onSuccess: VoidFunction;
}

const useUpdateLabel = ({ imageKey, onSuccess }: UseUpdateLabelParams) => {
  const mutation = useMutation({
    mutationFn: (data: UpdateLabelRequestBody) =>
      apiClient.put(`${API_PATH.LABEL}/${imageKey}`, data),
    onSuccess,
    onError: error => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });

  return mutation;
};

export default useUpdateLabel;
