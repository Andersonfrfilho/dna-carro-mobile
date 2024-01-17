import axios from "axios";
import { requestInterceptor } from "../interceptors/request.service.interceptor";
import { refreshTokenInterceptor } from "../interceptors/response.service.interceptor";
import { errorInterceptor } from "../interceptors/error.service.interceptor";

const apiAuth = axios.create({
  // baseURL: 'https://staging.api.cherry-go.com',
  baseURL: "http://10.0.2.2:3333",
  // baseURL: "http://localhost:3333",
});
requestInterceptor(apiAuth);
refreshTokenInterceptor(apiAuth);
errorInterceptor(apiAuth);

export { apiAuth };
