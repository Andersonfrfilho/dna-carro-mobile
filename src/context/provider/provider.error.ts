import { HttpStatusCode } from "axios";
import {
  CommonsErrors,
  EXPIRED_PROVIDER_TOKEN_LOCAL,
} from "../../modules/common/common.error";
import {
  InterceptorLocalErrors,
  TOKEN_NOT_EXIST_SECURITY_CACHE,
} from "../../services/interceptors/error.service.interceptor";

export const TOKEN_NOT_FOUND = 1036;

export const ProviderErrors = {
  ...CommonsErrors,
  ...InterceptorLocalErrors,
  [TOKEN_NOT_FOUND]: {
    code: TOKEN_NOT_FOUND,
    reason: "Refaça o login",
    message: "TOKEN_NOT_FOUND",
    statusCode: HttpStatusCode.Forbidden,
  },
};

export const PROVIDER_ERRORS_TO_RESET_SESSION = [
  EXPIRED_PROVIDER_TOKEN_LOCAL.toString(),
  TOKEN_NOT_EXIST_SECURITY_CACHE.toString(),
  TOKEN_NOT_FOUND.toString(),
];
