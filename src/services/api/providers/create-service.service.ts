import { apiAuth } from "../provider-auth.service";

interface Details {
  description: string;
}
export interface CreateServiceServiceParamsDto {
  name: string;
  amount: number;
  duration: number;
  details: Details;
  active: boolean;
}

export async function createServiceProviderService(
  params: CreateServiceServiceParamsDto
): Promise<void> {
  try {
    const { data } = await apiAuth.post<void>(
      `/user/provider/services`,
      params,
      {
        headers: {
          "Content-Type": "application/json;",
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}
