import axios from "axios";
import { errorInterceptor } from "../interceptors/error.service.interceptor";

const api = axios.create({
  // baseURL: 'https://staging.api.cherry-go.com',
  baseURL: "http://10.0.2.2:3333",
  // baseURL: "http://localhost:3333",
  timeout: 1000,
});

errorInterceptor(api);

export { api };
