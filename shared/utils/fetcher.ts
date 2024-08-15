import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

/**
 * fungsi ini untuk menghandle api
 *
 * @param props AxiosRequestConfig
 * @returns `T` if success
 * @returns `undefined` or `Error` if response failed
 */
async function Fetcher<Response, ErrorResponse>(
  props: Partial<AxiosRequestConfig>
) {
  try {
    const response = await axiosInstance<
      Response,
      AxiosResponse<IResponse<Response, ErrorResponse>>
    >(props);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return Promise.reject(e);
    }
    throw e;
  }
}

export default Fetcher;
