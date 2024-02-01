import axios, { InternalAxiosRequestConfig } from "axios";
import { URL_API } from "../../env/env";

export const http = axios.create({
  baseURL: URL_API,
});
http.interceptors.request.use(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: InternalAxiosRequestConfig<any>
  ) => {
    // return config;
    if (config.url?.includes("login")) return config;
    else {
      // TODO uncomment this line
      const token = localStorage.getItem("token");
      // const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJtaWFsaXNvYW11cmllbGxlQGdtYWlsLmNvbSIsImlhdCI6MTcwNjEyNTczNiwiZXhwIjoxNzA2MjEyMTM2LCJlbWFpbCI6Im1pYWxpc29hbXVyaWVsbGVAZ21haWwuY29tIiwiaWQiOjQsImF1dGhvcml6YXRpb24iOiJVU0VSIn0.CxGeT-sR7a8IhsiMyqdKTgjJ3_wUxIuf5zYazHa3PY6sUoNTkEuJuWe6n6jfbH0m";
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    }
  },
  (err) => Promise.reject(err)
);
