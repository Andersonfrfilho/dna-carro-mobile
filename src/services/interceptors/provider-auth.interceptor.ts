import { AxiosInstance } from "axios";

export function providerAuthInterceptor(api: AxiosInstance) {
  api.interceptors.response.use(
    (response) => {
      console.log("response interceptor ############");
      return response;
    },
    (err) => {
      return new Promise((resolve, reject) => {
        const originalRequest = err.config;

        if (
          !!err?.response?.status &&
          err.response.status === 401 &&
          err.config &&
          !err.config._retry
        ) {
          originalRequest._retry = true;

          const res = api
            .post("/v1/users/refresh_token", {
              refresh_token: "user.refresh_token",
            })
            .then((response) => {
              api.defaults.headers.authorization = `Bearer ${response.data.token}`;
              originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
              return api(originalRequest);
            });

          resolve(res);
        } else {
          reject(err);
        }
      });
    }
  );
}
