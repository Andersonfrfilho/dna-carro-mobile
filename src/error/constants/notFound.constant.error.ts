import { HttpStatusCode } from "axios";

const AXIOS_NOT_FOUND = {
  message: "Request failed with status code 404",
  name: "AxiosError",
  statusCode: HttpStatusCode.NotFound,
};

export const notFoundErrors = {
  AXIOS_NOT_FOUND,
};
