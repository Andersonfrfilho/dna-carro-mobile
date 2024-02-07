import { HttpStatusCode } from "axios";
import {
  CommonsErrors,
  EXPIRED_PROVIDER_TOKEN_LOCAL,
} from "../../modules/common/common.error";

export const INVALID_PASSWORD = 1015;

export const SignInErrors = {
  ...CommonsErrors,
  [INVALID_PASSWORD]: {
    code: INVALID_PASSWORD,
    reason: "Usuário ou senha invalido",
    message: "INVALID_PASSWORD",
    statusCode: HttpStatusCode.NotFound,
  },
};

export const ERRORS_TO_RESET_SESSION = [
  EXPIRED_PROVIDER_TOKEN_LOCAL.toString(),
];
