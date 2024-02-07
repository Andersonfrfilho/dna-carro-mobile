import { AxiosInstance } from "axios";
import {
  SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY,
  SignInAuthTokenStorageSecurityKey,
} from "../../storage/keys/sign-in.keys";
import { getSecurityStorageState } from "../../storage/secure/security.storage";
import { AppError } from "../../error/app.error";
import { ProviderErrors } from "../../context/provider/provider.error";
import { EXPIRED_PROVIDER_TOKEN_LOCAL } from "../../modules/common/common.error";

export const requestInsertTokenInterceptor = (api: AxiosInstance) =>
  api.interceptors.request.use(
    async (config) => {
      const dataSecurityCache =
        await getSecurityStorageState<SignInAuthTokenStorageSecurityKey>(
          SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY
        );
      if (dataSecurityCache?.expireIn && dataSecurityCache?.token) {
        const dateNow = new Date().getTime();
        const dateExpirationToken = new Date(
          Number(dataSecurityCache.expireIn)
        ).getTime();
        const isExpired = dateNow > dateExpirationToken;
        if (isExpired) {
          console.log(dateNow, dateExpirationToken);
          throw new AppError({
            message: ProviderErrors[EXPIRED_PROVIDER_TOKEN_LOCAL].message,
            code: EXPIRED_PROVIDER_TOKEN_LOCAL.toString(),
            status_code:
              ProviderErrors[EXPIRED_PROVIDER_TOKEN_LOCAL].statusCode,
          });
        }
        config.headers["Authorization"] = "Bearer " + dataSecurityCache.token;
      }
      config.headers["Content-Type"] = "application/json";
      return config;
    },
    (error) => {
      throw error;
    }
  );
