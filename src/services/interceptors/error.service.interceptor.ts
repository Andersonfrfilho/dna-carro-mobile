import axios, { AxiosInstance } from "axios";

export function errorInterceptor(api: AxiosInstance) {
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      throw new Error(err.response.data.message);
    }
  );
}
