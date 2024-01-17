import { HttpStatusCode } from "axios";

export const INVALID_PASSWORD = 1015;

export const SignInErrors = {
  [INVALID_PASSWORD]: {
    code: INVALID_PASSWORD,
    reason: "Usuário ou senha invalido",
    message: "INVALID_PASSWORD",
    statusCode: HttpStatusCode.NotFound,
  },
};
