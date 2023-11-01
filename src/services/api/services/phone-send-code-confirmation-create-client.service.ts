import { api } from "../provider.service";

interface ServiceResponse {
  expiration: string;
}
type ParamsDto = {
  countryCode: "55";
  ddd: string;
  number: string;
};

export async function phoneSendCodeConfirmationCreateClientService({
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
      "/phone/send/code/confirmation/create/client",
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
