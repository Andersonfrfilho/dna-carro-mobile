import { apiAuth } from "../provider-auth.service";
import { AvailableDay } from "./providers.interface";

export interface GetAvailableDaysServiceResultDto extends AvailableDay {}

export async function getAvailableDaysProviderService(): Promise<
  GetAvailableDaysServiceResultDto[]
> {
  try {
    const { data } = await apiAuth.get<GetAvailableDaysServiceResultDto[]>(
      `/user/provider/available-days`,
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
