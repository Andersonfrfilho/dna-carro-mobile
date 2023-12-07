import { HttpStatusCode } from "axios";

export const CACHE_GET_ERROR = 1031;
export const CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND = 1019;
export const PHONE_NUMBER_CODE_CONFIRMATION_INCORRECT = 1022;
export const SignUpErrors = {
  [CACHE_GET_ERROR]: {
    code: CACHE_GET_ERROR,
    reason: "User does not have any information in the registration flow cache",
    message: "CACHE_GET_ERROR",
    statusCode: HttpStatusCode.NotFound,
  },
  [CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND]: {
    code: CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND,
    reason:
      "User does not have any information in the registration flow cache in confirmation phone",
    message: "CACHE_GET_ERROR",
    statusCode: HttpStatusCode.NotFound,
  },
  [PHONE_NUMBER_CODE_CONFIRMATION_INCORRECT]: {
    code: PHONE_NUMBER_CODE_CONFIRMATION_INCORRECT,
    reason: "User wrong code confirmation phone",
    message: "PHONE_NUMBER_CODE_CONFIRMATION_INCORRECT",
    statusCode: HttpStatusCode.BadRequest,
  },
};
