import {
  Pagination,
  PaginationParamsDto,
} from "../../../modules/common/common.interface";

export interface ServiceParamsPagination extends PaginationParamsDto<Service> {}

export interface ServicesPagination extends Pagination<Service> {}

export interface AppointmentPagination extends Pagination<Appointment> {}

export interface Appointment {
  id: string;
  initialDate: number;
  finalDate: number;
  confirm: boolean;
  duration: number;
  status: string;
  details: any;
  appointmentProvider: AppointmentProvider[];
  appointmentAddresses: AppointmentAddress[];
  appointmentClients: AppointmentClient[];
  appointmentService: AppointmentService[];
  events: Event[];
}

export interface AppointmentProvider {
  id: string;
  appointmentId: string;
  providerId: string;
  active: boolean;
  status: string;
  provider: Provider;
}

export interface Provider {
  id: string;
  name: string;
  lastName: string;
  document: string;
  documentType: string;
  email: string;
  gender: string;
  details: any;
  birthDate: number;
  active: boolean;
}

export interface AppointmentAddress {
  id: string;
  appointmentId: string;
  addressId: string;
  address: Address;
}

export interface Address {
  id: string;
  street: string;
  number: string;
  zipcode: string;
  district: string;
  city: string;
  state: string;
  country: string;
  longitude: string;
  latitude: string;
  complement: string;
  reference: string;
  details: any;
}

export interface AppointmentClient {
  id: string;
  appointmentId: string;
  clientId: string;
  active: boolean;
  client: Client;
}

export interface Client {
  id: string;
  name: string;
  lastName: string;
  document: string;
  documentType: string;
  email: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  userClientImageProfiles: UserClientImageProfile[];
}

export interface UserClientImageProfile {
  id: string;
  userId: string;
  userImageProfileId: string;
  createdAt: string;
  updatedAt: any;
  deletedAt: any;
  imageProfile: ImageProfile;
}

export interface ImageProfile {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface AppointmentService {
  id: string;
  appointmentId: string;
  serviceId: string;
  amount: number;
  details: any;
  service: Service;
}

export interface Service {
  id: string;
  providerId: string;
  name: string;
  amount: number;
  duration: number;
  details: any;
  active: boolean;
}

export interface Event {
  id: string;
  appointmentId: string;
  status: string;
  participant: any;
  details: any;
}

export interface AvailableDay {
  id: string;
  day: string;
}

export interface AvailableHoursItems {
  id: string;
  hour: string;
  selected: boolean;
}

export interface GetAvailableHoursProviderServiceResultDto
  extends AvailableHoursItems {}

export interface ServicesItem extends Pagination<Service> {}
