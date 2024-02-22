import { GetAvailableDaysServiceResultDto } from "../../services/api/providers/get-available-days.service";
import { AppointmentPagination } from "../../services/api/providers/providers.interface";
import { AppointmentStatus } from "../constants/appointment.constant";
import { DAYS_WEEK, DaysItemList } from "../constants/datetime.constant";

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

export interface GetAvailableDaysItemListResultDto extends DaysItemList {}

export interface SetAvailableDaysParamsDto extends DaysItemList {}

export interface SetAvailableDaysItemListResultDto extends DaysItemList {}
