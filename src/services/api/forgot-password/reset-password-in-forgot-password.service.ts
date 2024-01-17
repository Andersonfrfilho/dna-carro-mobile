import { api } from "../provider.service";

interface ServiceResponse {
  expirationInMilliseconds: string;
}
type ParamsDto = {
  countryCode: string;
  ddd: string;
  number: string;
  password: string;
  code: string;
};

export async function resetPasswordInForgotPasswordService({
  countryCode,
  ddd,
  number,
  password,
  code,
}: ParamsDto): Promise<ServiceResponse> {
  const body = {
    countryCode,
    ddd,
    number,
    password,
    code,
  };
  try {
    const { data } = await api.post<ServiceResponse>(
      "/auth/forgot-password/phone/reset/code",
      body,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}
