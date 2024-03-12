import React, { useContext, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { useError } from "../errors.context";
import { getSecurityStorageState, removeSecurityStorageAll } from "../../storage/secure/security.storage";
import { SIGN_IN_REMEMBER_USER_STORAGE_SECURITY_KEY, SignInAuthRememberUserStorageSecurityKeyDto } from "../../storage/keys/sign-in.keys";
import { AppointmentStatus } from "../constants/appointment.constant";
import { AppointmentsByStatusInterface, CreateServiceParamsDto, FormattedAppointmentToAppointmentsByStatusParamsDto, GetAppointmentByStatusParamsDto, GetAppointmentByStatusResultDto, GetAvailableDaysItemListResultDto, GetServicesParamsDto, GetServicesResultDto, SetAvailabilitiesHoursParamsDto, SetAvailableDaysItemListResultDto, SetAvailableDaysParamsDto, SetAvailableHoursItemListResultDto } from "./provider.context.interface";
import { PROVIDER_ERRORS_TO_RESET_SESSION, ProviderErrors } from "./provider.error";
import { getAppointmentsByStatusProviderService } from "../../services/api/providers/get-appointments-by-status.service";
import { getAppointmentByIdProviderService } from "../../services/api/providers/get-appointment-by-id.service";
import { getAvailableDaysProviderService } from "../../services/api/providers/get-available-days.service";
import { DAYS_WEEK_IDS, DAYS_WEEK_SELECT_ITEMS, DaysItemList } from "../constants/datetime.constant";
import { setAvailableDaysProviderService } from "../../services/api/providers/set-available-days.service";
import { getAvailableHoursProviderService } from "../../services/api/providers/get-available-hours.service";
import { setAvailableHoursProviderService } from "../../services/api/providers/set-available-hours.service";
import { AvailableHoursItems, GetAvailableHoursProviderServiceResultDto, Service, ServiceParamsPagination, ServicesItem } from "../../services/api/providers/providers.interface";
import { createServiceProviderService } from "../../services/api/providers/create-service.service";
import { getServicesProviderService } from "../../services/api/providers/get-services.service";
import { set } from "react-hook-form";
import { Pagination } from "../../modules/common/common.interface";


interface ProviderContextInterface {
  isProviderLoading: boolean;
  setIsProviderLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAppointmentsConfirmLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAppointmentsCreateLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getAppointmentByStatus(params: GetAppointmentByStatusParamsDto): Promise<GetAppointmentByStatusResultDto>;
  appointmentsConfirmLoading: boolean;
  appointmentsCreateLoading: boolean;
  handleSelectAppointment(id: string): Promise<void>;
  getAvailableDaysByProvider(): Promise<GetAvailableDaysItemListResultDto[]>;
  setAvailableDaysByProvider(params: SetAvailableDaysParamsDto[]): Promise<SetAvailableDaysItemListResultDto[]>;
  daysAvailable: DaysItemList[];
  setDaysAvailable: React.Dispatch<React.SetStateAction<DaysItemList[]>>;
  setAvailabilitiesHoursByProvider(params: SetAvailabilitiesHoursParamsDto[]): Promise<SetAvailableHoursItemListResultDto[]>;
  getAvailabilitiesHoursByProvider(): Promise<GetAvailableHoursProviderServiceResultDto[]>;
  hoursAvailable: AvailableHoursItems[];
  setHoursAvailable: React.Dispatch<React.SetStateAction<AvailableHoursItems[]>>;
  createProviderService: (params: CreateServiceParamsDto) => Promise<void>;
  getServices(params: GetServicesParamsDto): Promise<GetServicesResultDto>;
  services: ServicesItem;
}

// Define the Provider component
interface ProviderProps {
  readonly children: React.ReactNode;
}

// Create the AuthContext
const ProviderContext = React.createContext<ProviderContextInterface | undefined>(
  undefined
);

export function ProviderProvider(props: ProviderProps) {
  const router = useRouter()
  const { appErrorVerifyError } = useError()
  const [isProviderLoading, setIsProviderLoading] =
    React.useState<boolean>(false);
  const [appointmentsConfirmLoading, setAppointmentsConfirmLoading] =
    React.useState<boolean>(false);
  const [appointmentsCreateLoading, setAppointmentsCreateLoading] =
    React.useState<boolean>(false);
  const [errorLocalProviderContext, setErrorLocalProviderContext] =
    React.useState<string>("");
  const [appointments, setAppointments] = React.useState<AppointmentsByStatusInterface>({
    cancel: {},
    confirm: {},
    created: {},
    expired: {}
  } as AppointmentsByStatusInterface)
  const [daysAvailable, setDaysAvailable] = useState<DaysItemList[]>(DAYS_WEEK_SELECT_ITEMS);
  const [hoursAvailable, setHoursAvailable] = useState<AvailableHoursItems[]>([]);
  const [services, setServices] = useState<ServicesItem>({
    _links: {
      first: {
        href: ""
      },
      last: {
        href: ""
      },
      next: {
        href: ""
      },
      previous: {
        href: ""
      }
    },
    results: [],
    limit: '0',
    offset: '0',
    size: '0'
  });




  function formattedAppointmentToAppointmentsByStatus({ status, ...appointmentsParams }: FormattedAppointmentToAppointmentsByStatusParamsDto): AppointmentsByStatusInterface {
    return {
      ...appointments,
      [`${status}`]: appointmentsParams
    }
  }

  async function getRememberMe(): Promise<SignInAuthRememberUserStorageSecurityKeyDto | null> {
    const dataRememberMeStringFormat = await getSecurityStorageState<SignInAuthRememberUserStorageSecurityKeyDto>(SIGN_IN_REMEMBER_USER_STORAGE_SECURITY_KEY)
    return dataRememberMeStringFormat
  }

  async function getAppointmentByStatus(params: GetAppointmentByStatusParamsDto): Promise<GetAppointmentByStatusResultDto> {
    try {
      setIsProviderLoading(true)
      const result = await getAppointmentsByStatusProviderService(params)
      const formattedAppointments = formattedAppointmentToAppointmentsByStatus({ status: params.status, ...result });
      setAppointments(formattedAppointments)
      return formattedAppointments
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    } finally {
      setIsProviderLoading(false)
    }
  }
  async function appErrorVerifyErrorLocal(error: any): Promise<boolean> {

    const code = error?.response?.data?.code || error?.code

    const codes = Object.keys(ProviderErrors)
    const existCodeInCodes = codes.includes(code.toString());
    if (existCodeInCodes) {
      if (PROVIDER_ERRORS_TO_RESET_SESSION.includes(code)) {
        await removeSecurityStorageAll();
        router.replace('/sign-in')
        return;
      }

      return true;
    }
    return false;
  }

  async function handleSelectAppointment(id: string) {
    setIsProviderLoading(true)
    try {
      const appointment = await getAppointmentByIdProviderService({ id })
      router.push({
        pathname: 'provider/options/sections/appointments/appointment',
        params: {
          appointment
        }
      })
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    } finally {
      setIsProviderLoading(false)
    }
  }

  async function getAvailableDaysByProvider(): Promise<GetAvailableDaysItemListResultDto[]> {
    try {
      setIsProviderLoading(true)
      const result = await getAvailableDaysProviderService()
      const formattedAppointments = DAYS_WEEK_SELECT_ITEMS.map(item => ({
        ...item,
        selected: !!result.find(day => day.day === item.id) || false
      }))
      setDaysAvailable(formattedAppointments)
      return formattedAppointments
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    } finally {
      setIsProviderLoading(false)
    }
  }

  async function setAvailableDaysByProvider(params: SetAvailableDaysParamsDto[]): Promise<SetAvailableDaysItemListResultDto[]> {
    try {
      setIsProviderLoading(true)
      const formattedDays = params.filter(day => day.selected).map(day => (day.id as DAYS_WEEK_IDS))

      const result = await setAvailableDaysProviderService({ days: formattedDays })
      const formattedAppointments = DAYS_WEEK_SELECT_ITEMS.map(item => ({
        ...item,
        selected: result.some(day => day.day === item.id) || false
      }))
      setDaysAvailable(formattedAppointments)
      return formattedAppointments
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    } finally {
      setIsProviderLoading(false)
    }
  }

  async function getAvailabilitiesHoursByProvider(): Promise<GetAvailableHoursProviderServiceResultDto[]> {
    try {
      setIsProviderLoading(true)
      const result = await getAvailableHoursProviderService()
      setHoursAvailable(result)
      return result
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    } finally {
      setIsProviderLoading(false)
    }
  }

  async function createProviderService(params: CreateServiceParamsDto) {
    try {
      setIsProviderLoading(true)
      await createServiceProviderService(params)
      router.push('/provider/options/services')
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    } finally {
      setIsProviderLoading(false)
    }
  }

  async function setAvailabilitiesHoursByProvider(params: SetAvailabilitiesHoursParamsDto[]): Promise<SetAvailableHoursItemListResultDto[]> {
    try {
      setIsProviderLoading(true)
      const selectedHoursStartEnd = []
      let selectedIntervalHours = []
      let addInOtherArray = 0;
      params.forEach(hour => {
        if (hour.selected) {
          selectedIntervalHours.push(hour.hour)
          addInOtherArray += 1
        } else {
          if (addInOtherArray > 1) {
            selectedHoursStartEnd.push({
              start: selectedIntervalHours[0],
              end: selectedIntervalHours[selectedIntervalHours.length - 1],
            })
            selectedIntervalHours = []
            addInOtherArray = 0;
          }
        }
      })

      const result = await setAvailableHoursProviderService({
        hours: selectedHoursStartEnd
      })

      return result
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    } finally {
      setIsProviderLoading(false)
    }
  }

  async function getServices(params: GetServicesParamsDto): Promise<GetServicesResultDto> {
    try {
      setIsProviderLoading(true)
      const result = await getServicesProviderService(params)
      setServices(result)
      return result
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    } finally {
      setIsProviderLoading(false)
    }
  }

  const contextValue = useMemo(() => ({
    isProviderLoading,
    setIsProviderLoading,
    getAppointmentByStatus,
    setAppointmentsConfirmLoading,
    setAppointmentsCreateLoading,
    appointmentsConfirmLoading,
    appointmentsCreateLoading,
    handleSelectAppointment,
    getAvailableDaysByProvider,
    daysAvailable,
    setDaysAvailable,
    setAvailableDaysByProvider,
    setAvailabilitiesHoursByProvider,
    getAvailabilitiesHoursByProvider,
    hoursAvailable,
    setHoursAvailable,
    createProviderService,
    getServices,
    services
  }), [
    isProviderLoading,
    setIsProviderLoading,
    getAppointmentByStatus,
    setAppointmentsConfirmLoading,
    setAppointmentsCreateLoading,
    appointmentsConfirmLoading,
    appointmentsCreateLoading,
    handleSelectAppointment,
    getAvailableDaysByProvider,
    daysAvailable,
    setDaysAvailable,
    setAvailableDaysByProvider,
    setAvailabilitiesHoursByProvider,
    getAvailabilitiesHoursByProvider,
    hoursAvailable,
    setHoursAvailable,
    createProviderService,
    getServices,
    services
  ]);
  return (
    <ProviderContext.Provider
      value={contextValue}
    >
      {props.children}
    </ProviderContext.Provider>
  );
}

export const useProvider = () => {
  const providerContext = useContext(ProviderContext);

  return providerContext;
};