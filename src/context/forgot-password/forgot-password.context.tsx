import React, { useContext, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { useError } from "../errors.context";
import { separatePhoneInComponent } from "../../utils/separatePhoneInComponent.util";
import { ForgotPasswordErrors } from "./forgot-password.constant.error";
import { ForgotPasswordResetPasswordParamsDto, PhoneVerifyCodeConfirmationForgotPasswordClientParamsDto } from "./dtos/forgot-password.dto";
import { phoneSendCodeForgotPasswordService } from "../../services/api/forgot-password/phone-send-code-forgot-password.service";
import { COUNTRY_CODE } from "../constants/account.constant";
import { phoneVerifyCodeForgotPasswordService } from "../../services/api/forgot-password/phone-verify-code-forgot-password.service";
import { resetPasswordInForgotPasswordService } from "../../services/api/forgot-password/reset-password-in-forgot-password.service";


interface ForgotPasswordContextInterface {
  isForgotPasswordLoading: boolean;
  phoneSendCodeConfirmationForgotPasswordClient: (phone: string) => Promise<void>;
  phoneVerifyCodeConfirmationForgotPasswordClient: (data: PhoneVerifyCodeConfirmationForgotPasswordClientParamsDto) => Promise<void>;
  setShowModalCodeConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  showModalCodeConfirmation: boolean;
  errorConfirmationCodeLocal: string;
  setErrorConfirmationCodeLocal: React.Dispatch<React.SetStateAction<string>>;
  expirationTimeCodeConfirmationPhone: string;
  setExpirationTimeCodeConfirmationPhone: React.Dispatch<React.SetStateAction<string>>;
  resetPassword(data: ForgotPasswordResetPasswordParamsDto)
}

// Define the Provider component
interface ProviderProps {
  readonly children: React.ReactNode;
}

// Create the AuthContext
const ForgotPasswordContext = React.createContext<ForgotPasswordContextInterface | undefined>(
  undefined
);

export function ForgotPasswordProvider(props: ProviderProps) {
  const router = useRouter()
  const { appErrorVerifyError } = useError()
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] =
    React.useState<boolean>(false);
  const [expirationTimeCodeConfirmationPhone, setExpirationTimeCodeConfirmationPhone] = React.useState<string>("");
  const [showModalCodeConfirmation, setShowModalCodeConfirmation] = useState<boolean>(false);
  const [errorConfirmationCodeLocal, setErrorConfirmationCodeLocal] = useState<string>('')

  async function phoneSendCodeConfirmationForgotPasswordClient(phone: string) {
    setIsForgotPasswordLoading(true)
    const phoneWithCountryCode = `${COUNTRY_CODE}${phone}`
    const separatePhone = separatePhoneInComponent(phoneWithCountryCode)
    try {
      const { expireInMinutes } = await phoneSendCodeForgotPasswordService(separatePhone)
      setExpirationTimeCodeConfirmationPhone(expireInMinutes)
      setShowModalCodeConfirmation(true)
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    } finally {
      setIsForgotPasswordLoading(false)
    }
  }
  async function phoneVerifyCodeConfirmationForgotPasswordClient({ code, phone }: PhoneVerifyCodeConfirmationForgotPasswordClientParamsDto) {
    const phoneWithCountryCodeFormat = `${COUNTRY_CODE}${phone}`
    const separatePhone = separatePhoneInComponent(phoneWithCountryCodeFormat)
    const stringPhoneSeparated = JSON.stringify(separatePhone)
    try {
      await phoneVerifyCodeForgotPasswordService({ ...separatePhone, code })
      setShowModalCodeConfirmation(false)
      router.push({
        pathname: 'forgot-password/reset-password',
        params: {
          phone: stringPhoneSeparated
        }
      })
      return;
    } catch (error) {
      if (await appErrorVerifyErrorLocal({ ...error, phone })) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function resetPassword(data: ForgotPasswordResetPasswordParamsDto) {
    const { code, password, phone } = data

    const separatePhone = separatePhoneInComponent(phone)
    try {
      await resetPasswordInForgotPasswordService({ code, password, countryCode: separatePhone.countryCode, number: separatePhone.number, ddd: separatePhone.ddd })
      router.replace({
        pathname: 'sign-in',
      })
      return;
    } catch (error) {
      if (await appErrorVerifyErrorLocal({ ...error, phone })) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function appErrorVerifyErrorLocal(error: any): Promise<boolean> {
    const code = error?.response?.data?.code
    const codes = Object.keys(ForgotPasswordErrors)
    return false;
  }

  const contextValue = useMemo(() => ({
    isForgotPasswordLoading,
    phoneSendCodeConfirmationForgotPasswordClient,
    phoneVerifyCodeConfirmationForgotPasswordClient,
    setShowModalCodeConfirmation,
    showModalCodeConfirmation,
    expirationTimeCodeConfirmationPhone,
    setExpirationTimeCodeConfirmationPhone,
    errorConfirmationCodeLocal,
    setErrorConfirmationCodeLocal,
    resetPassword
  }), [
    isForgotPasswordLoading,
    showModalCodeConfirmation,
    setShowModalCodeConfirmation,
    phoneSendCodeConfirmationForgotPasswordClient,
    phoneVerifyCodeConfirmationForgotPasswordClient,
    expirationTimeCodeConfirmationPhone,
    setExpirationTimeCodeConfirmationPhone,
    errorConfirmationCodeLocal,
    setErrorConfirmationCodeLocal,
    resetPassword
  ]);
  return (
    <ForgotPasswordContext.Provider
      value={contextValue}
    >
      {props.children}
    </ForgotPasswordContext.Provider>
  );
}

export const useForgotPassword = () => {
  const forgotPasswordContext = useContext(ForgotPasswordContext);

  return forgotPasswordContext;
};