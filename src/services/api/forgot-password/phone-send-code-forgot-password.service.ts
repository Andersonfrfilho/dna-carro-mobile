import { api } from "../provider.service";

interface ServiceResponse {
  expireInMinutes: string;
}
type ParamsDto = {
  countryCode: string;
  ddd: string;
  number: string;
};

export async function phoneSendCodeForgotPasswordService({
  countryCode,
  ddd,
  number,
}: ParamsDto): Promise<ServiceResponse> {
  const body = {
    countryCode,
    ddd,
    number,
  };
  try {
    const { data } = await api.post<ServiceResponse>(
      "/auth/forgot-password/phone/send/code",
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
