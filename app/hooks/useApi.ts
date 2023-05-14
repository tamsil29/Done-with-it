import { ApiResponse } from "apisauce";
import React, { useCallback, useState } from "react";

const useApi = (
  apiFunc: (...args: Array<any>) => Promise<ApiResponse<any>>
) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    async (...args: Array<any>) => {
      setIsLoading(true);
      const response = await apiFunc(...args);
      setIsLoading(false);

      if (!response.ok) return setError(true);

      setError(false);
      setData(response?.data?.data as any);
    },
    [apiFunc]
  );

  return { request, data, error, isLoading };
};

export default useApi;
