import axios, { AxiosInstance } from "axios";
import { getSecurityStorageState } from "../../storage/secure/security.storage";
import { SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY } from "../../storage/keys/sign-in.keys";

export async function requestInterceptor(api: AxiosInstance) {
  axios.interceptors.request.use(
    async (config) => {
      const token = await getSecurityStorageState(
        SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY
      );

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
