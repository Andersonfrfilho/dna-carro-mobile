import { api } from "../provider.service";

type ParamsDto = {
  countryCode: "55";
  ddd: string;
  number: string;
  code: string;
};

export async function phoneVerifyCodeConfirmationCreateClientService({
  countryCode,
  ddd,
  number,
  code,
}: ParamsDto): Promise<void> {
  const body = {
    countryCode,
    ddd,
    number,
    code,
  };
  try {
    const { data } = await api.post<void>(
      "/phone/verify/code/confirmation/create/client",
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
