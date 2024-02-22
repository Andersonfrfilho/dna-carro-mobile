import axios, { AxiosInstance, HttpStatusCode } from "axios";

export function errorInterceptor(api: AxiosInstance) {
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      throw new Error(err.response.data.message);
    }
  );
}
export const TOKEN_NOT_EXIST_SECURITY_CACHE = 2003;
export const SECURITY_CACHE_ERROR = 2004;
export const GET_NEW_TOKEN_SESSION_ERROR = 2005;
export const InterceptorLocalErrors = {
  [TOKEN_NOT_EXIST_SECURITY_CACHE]: {
    code: TOKEN_NOT_EXIST_SECURITY_CACHE,
    reason: "Refaça o login",
    message: "TOKEN_NOT_EXIST_SECURITY_CACHE",
    statusCode: HttpStatusCode.BadRequest,
  },
  [SECURITY_CACHE_ERROR]: {
    code: SECURITY_CACHE_ERROR,
    reason: "Refaça o login",
    message: "SECURITY_CACHE_ERROR",
    statusCode: HttpStatusCode.BadRequest,
  },
  [GET_NEW_TOKEN_SESSION_ERROR]: {
    code: GET_NEW_TOKEN_SESSION_ERROR,
    reason: "Refaça o login",
    message: "GET_NEW_TOKEN_SESSION_ERROR",
    statusCode: HttpStatusCode.BadRequest,
  },
};
