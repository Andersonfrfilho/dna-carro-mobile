import { AppointmentStatus } from "../../../context/constants/appointment.constant";
import { PaginationParamsDto } from "../../../modules/common/common.interface";
import { apiAuth } from "../provider-auth.service";
import { Appointment, AppointmentPagination } from "./providers.interface";

export interface GetAppointmentsByStatusServiceParamsDto
  extends PaginationParamsDto<Appointment> {
  status: AppointmentStatus;
}

export interface GetAppointmentServiceResultDto extends AppointmentPagination {}

export async function getAppointmentsByStatusProviderService({
  status,
  ...params
}: GetAppointmentsByStatusServiceParamsDto): Promise<GetAppointmentServiceResultDto> {
  try {
    const { data } = await apiAuth.get<GetAppointmentServiceResultDto>(
      `/user/provider/appointments/status/${status}`,
      {
        params,
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
