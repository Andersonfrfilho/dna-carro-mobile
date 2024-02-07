import React, { useContext, useMemo } from "react";
import { useRouter } from "expo-router";
import { useError } from "../errors.context";
import { getSecurityStorageState, removeSecurityByKeysItemsAsync, removeSecurityStorageAll } from "../../storage/secure/security.storage";
import { SIGN_IN_REMEMBER_USER_STORAGE_SECURITY_KEY, SignInAuthRememberUserStorageSecurityKeyDto } from "../../storage/keys/sign-in.keys";
import { getAppointmentsByStatusService } from "../../services/api/providers/get-appointments-by-status.service";
import { AppointmentStatus } from "../constants/appointment.constant";
import { AppointmentsByStatusInterface, FormattedAppointmentToAppointmentsByStatusParamsDto, GetAppointmentByStatusResultDto } from "./provider.context.interface";
import { ProviderErrors, TOKEN_NOT_FOUND } from "./provider.error";
import { EXPIRED_PROVIDER_TOKEN_LOCAL } from "../../modules/common/common.error";


interface ProviderContextInterface {
  isProviderLoading: boolean;
  setIsProviderLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAppointmentsConfirmLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAppointmentsCreateLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getAppointmentByStatus(status: AppointmentStatus): Promise<GetAppointmentByStatusResultDto>;
  appointmentsConfirmLoading: boolean;
  appointmentsCreateLoading: boolean;
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
  const [hasSession, setHasSession] = React.useState<boolean>(false);
  const [appointments, setAppointments] = React.useState<AppointmentsByStatusInterface>({
    cancel: {},
    confirm: {},
    created: {},
    expired: {}
  } as AppointmentsByStatusInterface)


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
      const result = await getAppointmentsByStatusService({ status })
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
    console.log("################### provider", code, typeof code, codes)
    const existCodeInCodes = codes.includes(code.toString());
    console.log("###################=><=##################", code)
    if (existCodeInCodes) {
      if ([ProviderErrors[EXPIRED_PROVIDER_TOKEN_LOCAL].code.toString(), ProviderErrors[TOKEN_NOT_FOUND].code.toString()].includes(code.toString())) {
        console.log("################### entrou aqui")
        await removeSecurityStorageAll();
        router.replace('/sign-in')
        return;
      }

      return true;
    }
    return false;
  }


  const contextValue = useMemo(() => ({
    isProviderLoading,
    setIsProviderLoading,
    getAppointmentByStatus,
    setAppointmentsConfirmLoading,
    setAppointmentsCreateLoading,
    appointmentsConfirmLoading,
    appointmentsCreateLoading
  }), [
    isProviderLoading,
    setIsProviderLoading,
    getAppointmentByStatus,
    setAppointmentsConfirmLoading,
    setAppointmentsCreateLoading,
    appointmentsConfirmLoading,
    appointmentsCreateLoading
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