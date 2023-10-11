import { HttpStatusCode } from "axios";

const CACHE_GET_ERROR = 1031;
export const SignUpErrors = {
  [CACHE_GET_ERROR]: {
    code: CACHE_GET_ERROR,
    reason: "User does not have any information in the registration flow cache",
    message: "CACHE_GET_ERROR",
    statusCode: HttpStatusCode.NotFound,
  },
};
