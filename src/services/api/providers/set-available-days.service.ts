import { DAYS_WEEK_IDS } from "../../../context/constants/datetime.constant";
import { apiAuth } from "../provider-auth.service";
import { AvailableDay } from "./providers.interface";

export interface SetAvailableDaysServiceResultDto extends AvailableDay {}
export interface SetAvailableDaysServiceParamsDto {
  days: DAYS_WEEK_IDS[];
}

export async function setAvailableDaysProviderService(
  params: SetAvailableDaysServiceParamsDto
): Promise<SetAvailableDaysServiceResultDto[]> {
  try {
    const { data } = await apiAuth.post<SetAvailableDaysServiceResultDto[]>(
      `/user/provider/available-days`,
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
