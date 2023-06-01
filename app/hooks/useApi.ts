import { ApiResponse } from "apisauce";
import React, { useCallback, useState } from "react";

const useApi = (
  apiFunc: (...args: Array<any>) => Promise<ApiResponse<any>>
) => {
  const [data, setData] = useState<any>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const request = useCallback(
    async (...args: Array<any>) => {
      setIsLoading(true);
      const response = await apiFunc(...args);
      setIsLoading(false);

      setIsError(!response.ok)
      if (!response.ok) setError(response?.data?.message || 'An unknown error occurred!')
      setData(response?.data?.data);
      return response
    },
    [apiFunc]
  );

  return { request, data, error, isError, isLoading };
};

export default useApi;
