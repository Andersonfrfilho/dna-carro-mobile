import { api } from "../provider.service";

interface ServiceResponse {
  expirationInMilliseconds: string;
}
type ParamsDto = {
  countryCode: string;
  ddd: string;
  number: string;
  code: string;
};

export async function phoneVerifyCodeForgotPasswordService({
  countryCode,
  ddd,
  number,
  code,
}: ParamsDto): Promise<ServiceResponse> {
  const body = {
    countryCode,
    ddd,
    number,
    code,
  };
  try {
    const { data } = await api.post<ServiceResponse>(
      "/auth/forgot-password/phone/verify/code",
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
