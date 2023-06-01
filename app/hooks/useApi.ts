import { ApiResponse } from "apisauce";
import React, { useCallback, useState } from "react";

const useApi = <T, R> (
  apiFunc: (...args: Array<T>) => Promise<ApiResponse<R>>
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
      //@ts-ignore
      if (!response.ok) setError(response?.data?.message || 'An unknown error occurred!')
      //@ts-ignore
      setData(response?.data?.data);
      return response
    },
    [apiFunc]
  );

  return { request, data, error, isError, isLoading };
};

export default useApi;
