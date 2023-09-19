import axios from "axios";
import { refreshTokenInterceptor } from "../interceptors/response.service.interceptor";
import { requestInterceptor } from "../interceptors/request.service.interceptor";
import { errorInterceptor } from "../interceptors/error.service.interceptor";

const api = axios.create({
  // baseURL: 'https://staging.api.cherry-go.com',
  baseURL: "http://10.0.2.2:3333",
  // baseURL: "http://localhost:3333",
});

requestInterceptor(api);
refreshTokenInterceptor(api);
errorInterceptor(api);

export { api };
