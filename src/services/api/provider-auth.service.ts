import axios from "axios";
import { providerAuthInterceptor } from "../interceptors/provider-auth.interceptor";
import { requestInsertTokenInterceptor } from "../interceptors/request-insert-token.interceptor";
import { refreshTokenStrategyInterceptor } from "../interceptors/refresh-token-response.interceptor";

const apiAuth = axios.create({
  // baseURL: 'https://staging.api.cherry-go.com',
  baseURL: "http://10.0.2.2:3333",
  // baseURL: "http://localhost:3333",
  timeout: 1000,
});
requestInsertTokenInterceptor(apiAuth);
refreshTokenStrategyInterceptor(apiAuth);
export { apiAuth };
