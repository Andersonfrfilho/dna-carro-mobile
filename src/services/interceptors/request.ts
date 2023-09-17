import axios, { AxiosInstance } from "axios";

function requestInterceptor(api: AxiosInstance) {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorageService.getAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
}
