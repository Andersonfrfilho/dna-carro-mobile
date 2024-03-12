import { apiAuth } from "../provider-auth.service";
import { AvailableHoursItems } from "./providers.interface";

export interface SetAvailableHoursServiceResultDto
  extends AvailableHoursItems {}

interface HourStartEnd {
  start: string;
  end: string;
}
export interface SetAvailableDaysServiceParamsDto {
  hours: HourStartEnd[];
}

export async function setAvailableHoursProviderService(
  params: SetAvailableDaysServiceParamsDto
): Promise<SetAvailableHoursServiceResultDto[]> {
  try {
    const { data } = await apiAuth.post<SetAvailableHoursServiceResultDto[]>(
      `/user/provider/available-hours`,
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
