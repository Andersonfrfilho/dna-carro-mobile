import { HttpStatusCode } from "axios";
import { CommonsErrors } from "../../modules/common/common.error";

export const TOKEN_NOT_FOUND = 1036;

export const ProviderErrors = {
  ...CommonsErrors,
  [TOKEN_NOT_FOUND]: {
    code: TOKEN_NOT_FOUND,
    reason: "Refaça o login",
    message: "TOKEN_NOT_FOUND",
    statusCode: HttpStatusCode.Forbidden,
  },
};
