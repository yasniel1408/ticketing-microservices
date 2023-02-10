'use client';

import { useCallback, useState } from 'react';
import axiosInstance from '@/utils/axios/axiosInstance';

const useRequest = ({
  url,
  method,
  onSuccess,
}: {
  url: string;
  method: string;
  onSuccess: Function;
}) => {
  const [errors, setErrors] = useState(null);

  const doRequest = useCallback(
    async (data: any) => {
      try {
        setErrors(null);
        const response: any = await axiosInstance({
          url,
          method,
          data,
        });

        if (onSuccess) {
          onSuccess(response.data);
        }

        return response.data;
      } catch (err: any) {
        console.error(err?.response);
        setErrors(err?.response?.data?.errors);
      }
      return null;
    },
    [method, onSuccess, url],
  );

  return { doRequest, errors };
};

export default useRequest;
