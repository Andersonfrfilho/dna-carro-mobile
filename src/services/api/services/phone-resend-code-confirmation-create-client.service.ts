import { api } from "../provider.service";

type ParamsDto = {
  countryCode: "55";
  ddd: string;
  number: string;
};

export async function phoneResendCodeConfirmationCreateClientService({
  countryCode,
  ddd,
  number,
}: ParamsDto): Promise<void> {
  const body = {
    countryCode,
    ddd,
    number,
  };
  try {
    const { data } = await api.post<void>(
      "/phone/resend/code/confirmation/create/client",
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
