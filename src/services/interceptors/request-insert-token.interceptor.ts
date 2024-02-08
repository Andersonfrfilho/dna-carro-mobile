import { AxiosInstance } from "axios";
import {
  SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY,
  SignInAuthTokenStorageSecurityKey,
} from "../../storage/keys/sign-in.keys";
import { getSecurityStorageState } from "../../storage/secure/security.storage";

let isRefreshing = false;

const requestInsertTokenInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use(
    async (config) => {
      const dataSecurityCache =
        await getSecurityStorageState<SignInAuthTokenStorageSecurityKey>(
          SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY
        );

      if (dataSecurityCache?.expireIn && dataSecurityCache?.token) {
        config.headers["Authorization"] = "Bearer " + dataSecurityCache.token;
      }

      config.headers["Content-Type"] = "application/json";
      return config;
    },
    (error) => {
      throw error;
    }
  );
};

export { requestInsertTokenInterceptor };
