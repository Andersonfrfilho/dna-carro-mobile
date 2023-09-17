import axios from "axios";
import { refreshTokenInterceptor } from "../interceptors/response";
import { requestInterceptor } from "../interceptors/request";
import { errorInterceptor } from "../interceptors/error";

const api = axios.create({
  // baseURL: 'https://staging.api.cherry-go.com',
  // baseURL: 'http://10.0.2.2:3333',
  baseURL: "http://localhost:3333",
});

requestInterceptor(api);
refreshTokenInterceptor(api);
errorInterceptor(api);

export { api };
