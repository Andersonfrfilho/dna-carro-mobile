import { AppointmentPagination } from "../../services/api/providers/providers.interface";
import { AppointmentStatus } from "../constants/appointment.constant";

export interface AppointmentsByStatusInterface {
  confirm: AppointmentPagination;
  created: AppointmentPagination;
  cancel: AppointmentPagination;
  expired: AppointmentPagination;
}

export interface GetAppointmentByStatusResultDto
  extends AppointmentsByStatusInterface {}

export interface FormattedAppointmentToAppointmentsByStatusParamsDto
  extends AppointmentPagination {
  status: AppointmentStatus;
}
