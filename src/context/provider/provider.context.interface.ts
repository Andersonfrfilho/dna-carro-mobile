import {
  Pagination,
  PaginationParamsDto,
} from "../../modules/common/common.interface";
import { CreateServiceServiceParamsDto } from "../../services/api/providers/create-service.service";
import { Service } from "../../services/api/providers/get-services.service";
import {
  Appointment,
  AppointmentPagination,
  AvailableHoursItems,
  ServiceParamsPagination,
} from "../../services/api/providers/providers.interface";
import { AppointmentStatus } from "../constants/appointment.constant";
import { DaysItemList } from "../constants/datetime.constant";

export interface AppointmentsByStatusInterface {
  confirm: AppointmentPagination;
  created: AppointmentPagination;
  cancel: AppointmentPagination;
  expired: AppointmentPagination;
}
export interface GetAppointmentByStatusParamsDto
  extends PaginationParamsDto<Appointment> {
  status: AppointmentStatus;
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

export interface SetAvailableHoursItemListResultDto
  extends AvailableHoursItems {}

export interface SetAvailabilitiesHoursParamsDto extends AvailableHoursItems {}

export interface CreateServiceParamsDto extends CreateServiceServiceParamsDto {}

export interface GetServicesParamsDto extends ServiceParamsPagination {}
export interface GetServiceItemList extends GetServicesResultDto {}
export interface GetServicesResultDto extends Pagination<Service> {}
