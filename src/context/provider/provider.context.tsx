import React, { useContext, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { useError } from "../errors.context";
import { getSecurityStorageState, removeSecurityStorageAll } from "../../storage/secure/security.storage";
import { SIGN_IN_REMEMBER_USER_STORAGE_SECURITY_KEY, SignInAuthRememberUserStorageSecurityKeyDto } from "../../storage/keys/sign-in.keys";
import { AppointmentStatus } from "../constants/appointment.constant";
import { AppointmentsByStatusInterface, FormattedAppointmentToAppointmentsByStatusParamsDto, GetAppointmentByStatusResultDto, GetAvailableDaysItemListResultDto, SetAvailableDaysItemListResultDto, SetAvailableDaysParamsDto } from "./provider.context.interface";
import { PROVIDER_ERRORS_TO_RESET_SESSION, ProviderErrors } from "./provider.error";
import { getAppointmentsByStatusProviderService } from "../../services/api/providers/get-appointments-by-status.service";
import { getAppointmentByIdProviderService } from "../../services/api/providers/get-appointment-by-id.service";
import { getAvailableDaysProviderService } from "../../services/api/providers/get-available-days.service";
import { DAYS_WEEK_IDS, DAYS_WEEK_SELECT_ITEMS, DaysItemList } from "../constants/datetime.constant";
import { setAvailableDaysProviderService } from "../../services/api/providers/set-available-days.service";


interface ProviderContextInterface {
  isProviderLoading: boolean;
  setIsProviderLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAppointmentsConfirmLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAppointmentsCreateLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getAppointmentByStatus(status: AppointmentStatus): Promise<GetAppointmentByStatusResultDto>;
  appointmentsConfirmLoading: boolean;
  appointmentsCreateLoading: boolean;
  handleSelectAppointment(id: string): Promise<void>;
  getAvailableDaysByProvider(): Promise<GetAvailableDaysItemListResultDto[]>;
  setAvailableDaysByProvider(params: SetAvailableDaysParamsDto[]): Promise<SetAvailableDaysItemListResultDto[]>;
  daysAvailable: DaysItemList[];
  setDaysAvailable: React.Dispatch<React.SetStateAction<DaysItemList[]>>;
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

  async function getAppointmentByStatus(status: AppointmentStatus): Promise<GetAppointmentByStatusResultDto> {
    try {
      setIsProviderLoading(true)
      const result = await getAppointmentsByStatusProviderService({ status })
      const formattedAppointments = formattedAppointmentToAppointmentsByStatus({ status, ...result });
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
    setAvailableDaysByProvider
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
    setAvailableDaysByProvider
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