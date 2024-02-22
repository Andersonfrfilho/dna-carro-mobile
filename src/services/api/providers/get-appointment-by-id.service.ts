import { apiAuth } from "../provider-auth.service";
import { Appointment } from "./providers.interface";

interface GetAppointmentServiceResultDto extends Appointment {}
interface GetAppointmentByIdServiceParamsDto {
  id: string;
}

export async function getAppointmentByIdProviderService({
  id,
}: GetAppointmentByIdServiceParamsDto): Promise<GetAppointmentServiceResultDto> {
  try {
    const { data } = await apiAuth.get<GetAppointmentServiceResultDto>(
      `/user/provider/appointments/${id}`,
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
