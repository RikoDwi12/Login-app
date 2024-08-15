import { COOKIE_TOKEN } from "@modules/Auth/constants/cookies";
import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

// Interceptor request untuk menyisipkan access_token ke header Authorization
axiosInstance.interceptors.request.use(
  async config => {
    const accessToken = getCookie(COOKIE_TOKEN);
    const newConfig = config;
    if (accessToken) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
      newConfig.headers.Accept = "application/json";
    }

    return newConfig;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
