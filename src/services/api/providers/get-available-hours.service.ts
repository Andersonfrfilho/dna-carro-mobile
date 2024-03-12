import { apiAuth } from "../provider-auth.service";
import {
  AvailableDay,
  AvailableHoursItems,
  GetAvailableHoursProviderServiceResultDto,
} from "./providers.interface";

export interface GetAvailableHoursServiceResultDto
  extends AvailableHoursItems {}

export async function getAvailableHoursProviderService(): Promise<
  GetAvailableHoursProviderServiceResultDto[]
> {
  try {
    const { data } = await apiAuth.get<
      GetAvailableHoursProviderServiceResultDto[]
    >(`/user/provider/available-hours`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
