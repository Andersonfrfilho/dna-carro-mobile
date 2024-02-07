import axios from "axios";
import { errorInterceptor } from "../interceptors/error.service.interceptor";
import { providerAuthInterceptor } from "../interceptors/provider-auth.interceptor";
import { requestInsertTokenInterceptor } from "../interceptors/request-insert-token.interceptor";

const apiAuth = axios.create({
  // baseURL: 'https://staging.api.cherry-go.com',
  baseURL: "http://10.0.2.2:3333",
  // baseURL: "http://localhost:3333",
});
requestInsertTokenInterceptor(apiAuth);
providerAuthInterceptor(apiAuth);

export { apiAuth };
