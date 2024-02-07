import { AppointmentStatus } from "../../../context/constants/appointment.constant";
import { apiAuth } from "../provider-auth.service";
import { AppointmentPagination } from "./providers.interface";

export interface GetAppointmentsByStatusServiceParamsDto {
  status: AppointmentStatus;
}

export interface GetAppointmentServiceResultDto extends AppointmentPagination {}

export async function getAppointmentsByStatusService({
  status,
}: GetAppointmentsByStatusServiceParamsDto): Promise<GetAppointmentServiceResultDto> {
  try {
    const { data } = await apiAuth.get<GetAppointmentServiceResultDto>(
      `/user/provider/appointments/${status}`,
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
