import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
} from "axios";
import {
  SIGN_IN_AUTH_REFRESH_TOKEN_STORAGE_SECURITY_KEY,
  SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY,
  SignInAuthTokenStorageSecurityKey,
} from "../../storage/keys/sign-in.keys";
import {
  getSecurityStorageState,
  setSecurityStorageItemAsync,
} from "../../storage/secure/security.storage";
import { AppError } from "../../error/app.error";
import {
  GET_NEW_TOKEN_SESSION_ERROR,
  InterceptorLocalErrors,
  SECURITY_CACHE_ERROR,
} from "./error.service.interceptor";
import { tokenErrorsAvailableStrategyCodes } from "../../modules/common/common.error";

const refreshTokenStrategyInterceptor = (api: AxiosInstance) => {
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError & any) => {
      return new Promise((resolve, reject) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const code = error.response?.data?.code;

        if (
          status &&
          status === HttpStatusCode.Unauthorized &&
          tokenErrorsAvailableStrategyCodes.some(
            (tokenError) => tokenError.code === code
          ) &&
          originalRequest &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          getSecurityStorageState<SignInAuthTokenStorageSecurityKey>(
            SIGN_IN_AUTH_REFRESH_TOKEN_STORAGE_SECURITY_KEY
          )
            .then((refreshTokenSecurity) => {
              const res = api
                .post("/auth/session/refresh-token", {
                  refreshToken: refreshTokenSecurity.refreshToken,
                })
                .then((response) => {
                  const newBearerTokenHeader = "Bearer " + response.data.token;
                  api.defaults.headers.authorization = newBearerTokenHeader;
                  originalRequest.headers.Authorization = newBearerTokenHeader;
                  setSecurityStorageItemAsync(
                    SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY,
                    JSON.stringify({
                      token: response.data.token,
                      expireIn: response.data.expireIn,
                    })
                  );
                  setSecurityStorageItemAsync(
                    SIGN_IN_AUTH_REFRESH_TOKEN_STORAGE_SECURITY_KEY,
                    JSON.stringify({
                      refreshToken: response.data.refreshToken,
                      expireInRefreshToken: response.data.expireInRefreshToken,
                    })
                  );
                  return api(originalRequest);
                })
                .catch((err) => {
                  console.error(
                    "refreshTokenStrategyInterceptor - when get new token",
                    JSON.stringify(err)
                  );
                  reject(
                    new AppError({
                      message:
                        InterceptorLocalErrors[GET_NEW_TOKEN_SESSION_ERROR]
                          .message,
                      code: InterceptorLocalErrors[
                        GET_NEW_TOKEN_SESSION_ERROR
                      ].code.toString(),
                      status_code:
                        InterceptorLocalErrors[GET_NEW_TOKEN_SESSION_ERROR]
                          .statusCode,
                    })
                  );
                });

              resolve(res);
            })
            .catch((err) => {
              console.error(
                "refreshTokenStrategyInterceptor - when get token cache security",
                JSON.stringify(err)
              );
              reject(
                new AppError({
                  message: InterceptorLocalErrors[SECURITY_CACHE_ERROR].message,
                  code: InterceptorLocalErrors[
                    SECURITY_CACHE_ERROR
                  ].code.toString(),
                  status_code:
                    InterceptorLocalErrors[SECURITY_CACHE_ERROR].statusCode,
                })
              );
            });
        } else {
          console.error(
            "refreshTokenStrategyInterceptor - when get reason other reason",
            JSON.stringify(error)
          );
          const message = error.response?.data?.message;
          const content = error.response?.data?.content;
          reject(
            new AppError({
              message: message,
              code: code,
              status_code: status,
              content: content,
            })
          );
        }
      });
    }
  );
};

export { refreshTokenStrategyInterceptor };
