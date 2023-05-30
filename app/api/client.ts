import { ApiResponse, create } from "apisauce";
import cache from "../utility/cache";
import { AxiosRequestConfig } from "axios";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "http://10.18.1.134:4000/api",
});

apiClient.addAsyncRequestTransform(async(request)=>{
  const authToken = await authStorage.getToken();
  if(!authToken) return;
  if(request.headers) request.headers["x-auth-token"] = authToken
})

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
