import { HttpStatusCode } from "axios";

export const EXPIRED_PROVIDER_TOKEN_LOCAL = 2001;
export const EXPIRED_PROVIDER_REFRESH_TOKEN_LOCAL = 2002;
export const CommonsErrors = {
  [EXPIRED_PROVIDER_TOKEN_LOCAL]: {
    code: EXPIRED_PROVIDER_TOKEN_LOCAL,
    reason: "Refaça o login",
    message: "EXPIRED_PROVIDER_TOKEN_LOCAL",
    statusCode: HttpStatusCode.Forbidden,
  },
  [EXPIRED_PROVIDER_REFRESH_TOKEN_LOCAL]: {
    code: EXPIRED_PROVIDER_REFRESH_TOKEN_LOCAL,
    reason: "Refaça o login",
    message: "EXPIRED_PROVIDER_REFRESH_TOKEN_LOCAL",
    statusCode: HttpStatusCode.Forbidden,
  },
};

export const TOKEN_EXPIRED_ERROR_PROVIDER = 1035;
export const tokenErrorsAvailableStrategyCodes = [
  {
    code: TOKEN_EXPIRED_ERROR_PROVIDER,
    reason: "Refaça o login",
    message: "TOKEN_EXPIRED_ERROR_PROVIDER",
    statusCode: HttpStatusCode.Forbidden,
  },
];
