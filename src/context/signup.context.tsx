import React, { useContext, useState } from "react";
import { verifyWithoutFlowInfoCacheByEmailService } from "../services/api/services/verify-without-flow-info-cache-by-email.service";
import { useError } from "./errors.context";
import { CACHE_GET_ERROR, SignUpErrors } from "../error/constants/signup.constant.error";
import { useRouter } from "expo-router";
import { UserClientCacheUserServicePropsDto, userClientCacheTermService, userClientCacheUser } from "../services/api/services/create-user-info-cache.service";
import { verifyWithoutFlowInfoCacheByPhoneService } from "../services/api/services/verify-without-flow-info-cache-by-phone.service";
import { CreateUserInfoCacheContextParamsDto, GetTermsResponseDto, PhoneVerifyCodeConfirmationCreateClientParamsDto } from "./dtos/signup.dto";
import { separatePhoneInComponent } from "../utils/separatePhoneInComponent.util";

import { getDateUnix } from "../utils/getDate.util";
import { DOCUMENT_TYPES, GENDER_TYPES } from "../constants/account";
import { phoneSendCodeConfirmationCreateClientService } from "../services/api/services/phone-send-code-confirmation-create-client.service";
import { phoneResendCodeConfirmationCreateClientService } from "../services/api/services/phone-resend-code-confirmation-create-client.service";
import { phoneVerifyCodeConfirmationCreateClientService } from "../services/api/services/phone-verify-code-confirmation-create-client.service";
import { NameCacheKeyFlow } from "../services/api/enums/account.enum";
import { getLastTermService } from "../services/api/services/get-last-terms.service";
import { COUNTRY_CODE } from "./constants/account.constant";

interface SignUpContextInterface {
  isSignUpLoading: boolean;
  setIsSignUpLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showModalCodeConfirmation: boolean;
  expirationTimeCodeConfirmationPhone: string;
  verifyEmailToRegister: (email: string) => Promise<void>;
  verifyPhoneToRegister: (phone: string) => Promise<void>;
  createUserInfoCacheAccount: (data: CreateUserInfoCacheContextParamsDto) => Promise<void>;
  phoneSendCodeConfirmationCreateClient: (phone: string) => Promise<void>;
  phoneResendCodeConfirmationCreateClient: (phone: string) => Promise<void>;
  phoneVerifyCodeConfirmationCreateClient: (data: PhoneVerifyCodeConfirmationCreateClientParamsDto) => Promise<void>;
  closeModalCodeConfirmation: () => void;
  getLastTerm: () => Promise<GetTermsResponseDto>;
  loadingSignUp: boolean;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const SignUpContext = React.createContext<SignUpContextInterface | undefined>(
  undefined
);

export function SignUpProvider(props: ProviderProps) {
  const router = useRouter()
  const { appErrorVerifyError } = useError()
  const [isSignUpLoading, setIsSignUpLoading] =
    React.useState<boolean>(false);
  const [expirationTimeCodeConfirmationPhone, setExpirationTimeCodeConfirmationPhone] = useState('');
  const [showModalCodeConfirmation, setShowModalCodeConfirmation] = useState(false)
  const [loadingSignUp, setLoadingSignUp] = useState(false)

  async function createUserInfoCacheAccount(data: CreateUserInfoCacheContextParamsDto) {
    const { user, phone, term } = data;
    const {
      document,
      documentType,
      email,
      gender,
      lastName,
      name,
      password,
    } = user;
    const birthDate = getDateUnix(user.birthDate)

    const separatePhone = separatePhoneInComponent(phone)

    const formatInfos: UserClientCacheUserServicePropsDto = {
      user: {
        details: null,
        birthDate,
        document,
        documentType: DOCUMENT_TYPES[documentType],
        email,
        gender: GENDER_TYPES[gender],
        lastName,
        name,
        password
      },
      phone: separatePhone
    }
    const termData = {
      phone: separatePhone,
      term: {
        id: term.id,
        accept: term.accept
      }
    }
    try {
      await userClientCacheUser(formatInfos)
      await userClientCacheTermService(termData)

      router.push({
        pathname: 'sign-up/phone',
        params: {
          phone: JSON.stringify(separatePhone)
        }
      })
    } catch (error) {
      if (appErrorVerifyErrorLocal({ ...error, phone })) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function verifyEmailToRegister(email: string): Promise<void> {
    try {
      const data = await verifyWithoutFlowInfoCacheByEmailService(email)
    } catch (error) {
      if (appErrorVerifyErrorLocal({ ...error, email })) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function verifyPhoneToRegister(phone: string): Promise<void> {
    try {
      const phoneFormat = `55${phone}`
      const { missingCacheInfo } = await verifyWithoutFlowInfoCacheByPhoneService(phoneFormat)
      if (missingCacheInfo.includes(NameCacheKeyFlow.phone)) {
        router.push({
          pathname: 'sign-up/account/phone',
          params: {
            phone: phoneFormat
          }
        })
        return;
      }

      if (missingCacheInfo.includes(NameCacheKeyFlow.address)) {
        router.push({
          pathname: 'sign-up/account/address',
          params: {
            phone: phoneFormat
          }
        })
        return;
      }

      if (missingCacheInfo.includes(NameCacheKeyFlow.image)) {
        router.push({
          pathname: 'sign-up/account/image',
          params: {
            phone: phoneFormat
          }
        })
        return;
      }
    } catch (error) {
      if (appErrorVerifyErrorLocal({ ...error, phone })) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  function appErrorVerifyErrorLocal(error: any): boolean {
    const code = error?.response?.data?.code
    const codes = Object.keys(SignUpErrors)


    const existCodeInCodes = codes.includes(code.toString());
    if (!existCodeInCodes) {
      return true;
    }

    if (code === SignUpErrors[CACHE_GET_ERROR].code) {
      router.push({
        pathname: 'sign-up/account',
        params: {
          phone: `${COUNTRY_CODE}${error.phone}`
        }
      })
      return true;
    }

    return false;
  }

  async function phoneSendCodeConfirmationCreateClient(phone: string) {
    const separatePhone = separatePhoneInComponent(phone)
    try {
      const { expirationInMilliseconds } = await phoneSendCodeConfirmationCreateClientService(separatePhone)

      setExpirationTimeCodeConfirmationPhone(expirationInMilliseconds)
      setShowModalCodeConfirmation(true)
    } catch (error) {
      if (appErrorVerifyErrorLocal({ ...error, phone })) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function phoneResendCodeConfirmationCreateClient(phone: string) {
    const separatePhone = separatePhoneInComponent(phone)
    try {
      await phoneResendCodeConfirmationCreateClientService(separatePhone)
    } catch (error) {
      if (appErrorVerifyErrorLocal({ ...error, phone })) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function phoneVerifyCodeConfirmationCreateClient({ code, phone }: PhoneVerifyCodeConfirmationCreateClientParamsDto) {
    const separatePhone = separatePhoneInComponent(phone)
    try {
      await phoneVerifyCodeConfirmationCreateClientService({ ...separatePhone, code })
    } catch (error) {
      if (appErrorVerifyErrorLocal({ ...error, phone })) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  function closeModalCodeConfirmation() {
    setShowModalCodeConfirmation(false)
  }

  async function getLastTerm(): Promise<GetTermsResponseDto> {
    try {
      setLoadingSignUp(true)
      const data = await getLastTermService()
      return { id: data.id, text: data.description.text, version: data.version }
    } catch (error) {
      appErrorVerifyError(error)
    } finally {
      setLoadingSignUp(false)
    }
  }
  return (
    <SignUpContext.Provider
      value={{
        isSignUpLoading,
        setIsSignUpLoading,
        verifyEmailToRegister,
        verifyPhoneToRegister,
        createUserInfoCacheAccount,
        phoneSendCodeConfirmationCreateClient,
        phoneResendCodeConfirmationCreateClient,
        phoneVerifyCodeConfirmationCreateClient,
        showModalCodeConfirmation,
        expirationTimeCodeConfirmationPhone,
        closeModalCodeConfirmation,
        getLastTerm,
        loadingSignUp
      }}
    >
      {props.children}
    </SignUpContext.Provider>
  );
}

// Define the useAuth hook
export const useSignUp = () => {
  const signUpContext = useContext(SignUpContext);

  return signUpContext;
};