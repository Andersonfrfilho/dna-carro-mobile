import { HttpStatusCode } from "axios";

export const EXPIRED_PROVIDER_TOKEN_LOCAL = 2001;

export const CommonsErrors = {
  [EXPIRED_PROVIDER_TOKEN_LOCAL]: {
    code: EXPIRED_PROVIDER_TOKEN_LOCAL,
    reason: "Refaça o login",
    message: "EXPIRED_PROVIDER_TOKEN_LOCAL",
    statusCode: HttpStatusCode.Forbidden,
  },
};
