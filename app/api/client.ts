import { ApiResponse, create } from "apisauce";
import cache from "../utility/cache";
import { AxiosRequestConfig } from "axios";

const apiClient = create({
  baseURL: "http://192.168.0.101:3000/api",
});

const get = apiClient.get;
apiClient.get = async (
  url: string,
  params?: {} | undefined,
  axiosConfig?: AxiosRequestConfig<any> | undefined
) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } as ApiResponse<any>  : response;
};

export default apiClient;
