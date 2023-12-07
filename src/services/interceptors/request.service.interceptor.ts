import axios, { AxiosInstance } from "axios";
import { useStorageState } from "../../storage/secure/token.storage";
import { SIGN_IN_AUTH_TOKEN_KEY } from "../../storage/keys/sign-in.keys";

export async function requestInterceptor(api: AxiosInstance) {
  axios.interceptors.request.use(
    async (config) => {
      const token = await useStorageState(SIGN_IN_AUTH_TOKEN_KEY);
      console.log(token);
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      config.headers["Content-Type"] = "application/json";
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
}
