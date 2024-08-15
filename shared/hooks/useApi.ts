import Fetcher from "@shared/utils/fetcher";
import { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";
import useSWR from "swr";
import qs from "query-string";
import Notification from "@shared/utils/notification";
import useErrorApiHandler from "./useErrorApiHandler";

interface GetApiProps {
  /**
   * The URL for the request
   */
  url: string | null;
  /**
   * The URL query parameters
   */
  params?: object;
  /**
   * Hide notification
   */
  hideNotification?: boolean;
}

export async function apiCall<Response, ErrorResponse = any>(
  props: AxiosRequestConfig
) {
  const { method = "POST" } = props;
  return Fetcher<Response, ErrorResponse>({
    ...props,
    method,
  });
}

/**
 * hook for GET api with swr
 *
 * @param props
 * @returns
 */
export function useGet<Response>(props: GetApiProps) {
  const { url, params, hideNotification = false } = props;
  const urlWithParams = params ? `${url}?${qs.stringify(params)}` : url;
  const { setData } = useErrorApiHandler();

  return useSWR<IResponse<Response, any>, unknown>(urlWithParams, {
    onError: e => {
      if (e instanceof AxiosError && !hideNotification) {
        if (e.response?.status === 404) {
          return;
        }
        setData({
          data: e.response?.data,
          status: e.response?.status as number,
        });
        Notification.error(e.response?.data?.message);
      }
    },
  });
}

/**
 * hook for POST, PUT, DELETE api
 * @param props @interface AxiosRequestConfig
 * @returns
 */
export function useApi<Response, ErrorResponse = any>(
  props: AxiosRequestConfig
) {
  const { method = "POST" } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setData } = useErrorApiHandler();

  const action = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall<Response, ErrorResponse>({
        ...props,
        method,
      });
      setData({
        data: response as any,
        status: 200,
      });
      setIsLoading(false);
      return response;
    } catch (e: unknown) {
      setIsLoading(false);
      if (e instanceof AxiosError) {
        const err = e.response?.data;
        Notification.error(err?.message);
        setData({
          data: err,
          status: e.response?.status as number,
        });
      }
      throw e;
    }
  };

  return {
    action,
    isLoading,
  };
}
