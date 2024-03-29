import React, { useContext, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { AddressFindGeocodingReverseParamsDto, AddressFindGeocodingReverseResult, CreateUserAddressInfoCacheContextParamsDto, CreateUserImageInfoCacheContextParamsDto, CreateUserInfoCacheContextParamsDto, CreateUserInfoCachePhoneContextParamsDto, GetTermsResponseDto, PhoneVerifyCodeConfirmationCreateClientParamsDto } from "./dtos/sign-up.dto";
import { useError } from "../errors.context";
import { getDateUnix } from "../../utils/getDate.util";
import { separatePhoneInComponent } from "../../utils/separatePhoneInComponent.util";
import { UserClientCacheAddressServicePropsDto, UserClientCacheImageServicePropsDto, UserClientCachePhoneServicePropsDto, UserClientCacheUserServicePropsDto, createUserInfoCacheAddressService, createUserInfoCacheImageService, userClientCachePhoneService, userClientCacheTermService, userClientCacheUser } from "../../services/api/sign-up/create-user-info-cache.service";
import { COUNTRY_CODE, DOCUMENT_TYPES, GENDER_TYPES } from "../constants/account.constant";
import { createUserClientService } from "../../services/api/sign-up/create-user-client.service";
import { verifyWithoutFlowInfoCacheByEmailService } from "../../services/api/sign-up/verify-without-flow-info-cache-by-email.service";
import { verifyWithoutFlowInfoCacheByPhoneService } from "../../services/api/sign-up/verify-without-flow-info-cache-by-phone.service";
import { NameCacheKeyFlow } from "../../services/api/enums/account.enum";
import { phoneSendCodeConfirmationCreateClientService } from "../../services/api/sign-up/phone-send-code-confirmation-create-client.service";
import { phoneVerifyCodeConfirmationCreateClientService } from "../../services/api/sign-up/phone-verify-code-confirmation-create-client.service";
import { addressFindGeocodingReverseService } from "../../services/api/sign-up/address-find-geocoding-reverse.service";
import { getLastTermService } from "../../services/api/sign-up/get-last-terms.service";
import { CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND, CACHE_GET_ERROR, PHONE_NUMBER_CODE_CONFIRMATION_INCORRECT, SignUpErrors } from "./sign-up.constant.error";

//errorConfirmationCodeLocal, setErrorConfirmationCodeLocal, expirationTimeCodeConfirmationPhone, setExpirationTimeCodeConfirmationPhone
interface SignUpContextInterface {
  isSignUpLoading: boolean;
  setIsSignUpLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showModalCodeConfirmation: boolean;
  verifyEmailToRegister: (email: string) => Promise<void>;
  verifyAndCreatePhoneToRegister: (phone: string) => Promise<void>;
  createUserInfoCacheAccount: (data: CreateUserInfoCacheContextParamsDto) => Promise<void>;
  phoneSendCodeConfirmationCreateClient: (phone: string) => Promise<void>;
  phoneResendCodeConfirmationCreateClient: (phone: string) => Promise<void>;
  phoneVerifyCodeConfirmationCreateClient: (data: PhoneVerifyCodeConfirmationCreateClientParamsDto) => Promise<void>;
  closeModalCodeConfirmation: () => void;
  getLastTerm: () => Promise<GetTermsResponseDto>;
  loadingSignUp: boolean;
  expirationTimeCodeConfirmationPhone: string;
  setExpirationTimeCodeConfirmationPhone: React.Dispatch<React.SetStateAction<string>>;
  errorConfirmationCodeLocal: string;
  setErrorConfirmationCodeLocal: React.Dispatch<React.SetStateAction<string>>;
  addressFindGeocodingReverse(data: AddressFindGeocodingReverseParamsDto): Promise<AddressFindGeocodingReverseResult>;
  createUserInfoCacheAddress(data: CreateUserAddressInfoCacheContextParamsDto): Promise<void>;
  createUserInfoCacheImage(data: CreateUserImageInfoCacheContextParamsDto): Promise<void>;
}

// Define the Provider component
interface ProviderProps {
  readonly children: React.ReactNode;
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
  const [expirationTimeCodeConfirmationPhone, setExpirationTimeCodeConfirmationPhone] = useState('00:00');
  const [showModalCodeConfirmation, setShowModalCodeConfirmation] = useState(false)
  const [loadingSignUp, setLoadingSignUp] = useState(false)
  const [errorConfirmationCodeLocal, setErrorConfirmationCodeLocal] = useState<string>('')

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
      const isLocalError = await appErrorVerifyErrorLocal({ ...error, phone });
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function createUserInfoCachePhone(data: CreateUserInfoCachePhoneContextParamsDto) {
    const { phone } = data;

    const separatePhone = separatePhoneInComponent(phone)

    const formatInfos: UserClientCachePhoneServicePropsDto = {
      phone: separatePhone
    }

    try {
      await userClientCachePhoneService(formatInfos)
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal({ ...error, phone });
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    }
  }


  async function createUserInfoCacheAddress(data: CreateUserAddressInfoCacheContextParamsDto): Promise<void> {
    const { phone } = data;

    const separatePhone = separatePhoneInComponent(phone)

    const formatInfos: UserClientCacheAddressServicePropsDto = {
      phone: separatePhone,
      address: data.address
    }

    try {
      await createUserInfoCacheAddressService(formatInfos)
      router.push({
        pathname: 'sign-up/image',
        params: {
          phone: JSON.stringify(separatePhone)
        }
      })
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal({ ...error, phone });
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function createUserInfoCacheImage(data: CreateUserImageInfoCacheContextParamsDto): Promise<void> {
    const { phone } = data;

    const separatePhone = separatePhoneInComponent(phone)

    const formatInfos: UserClientCacheImageServicePropsDto = {
      phone: separatePhone,
      image: data.image
    }

    try {
      await createUserInfoCacheImageService(formatInfos)
      await createUserClientService({
        phone: separatePhone
      })
      router.replace({
        pathname: 'sign-in',
        params: {
          phone: JSON.stringify(separatePhone)
        }
      })
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal({ ...error, phone });
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function verifyEmailToRegister(email: string): Promise<void> {
    try {
      verifyWithoutFlowInfoCacheByEmailService(email)
    } catch (error) {
      if (await appErrorVerifyErrorLocal({ ...error, email })) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function verifyAndCreatePhoneToRegister(phone: string): Promise<void> {
    const phoneWithCountryCodeFormat = `${COUNTRY_CODE}${phone}`
    const separatePhone = separatePhoneInComponent(phoneWithCountryCodeFormat)
    const stringPhoneSeparated = JSON.stringify(separatePhone)
    try {
      const { missingCacheInfo } = await verifyWithoutFlowInfoCacheByPhoneService(phoneWithCountryCodeFormat)

      if (missingCacheInfo.includes(NameCacheKeyFlow.phone)) {
        router.push({
          pathname: 'sign-up',
          params: {
            phone: stringPhoneSeparated
          }
        })
        return;
      }

      if (missingCacheInfo.includes(NameCacheKeyFlow.user || NameCacheKeyFlow.term)) {
        router.push({
          pathname: 'sign-up/account',
          params: {
            phone: stringPhoneSeparated
          }
        })
        return;
      }

      if (missingCacheInfo.includes(NameCacheKeyFlow.phoneConfirmation)) {
        router.push({
          pathname: 'sign-up/phone',
          params: {
            phone: stringPhoneSeparated
          }
        })
        return;
      }

      if (missingCacheInfo.includes(NameCacheKeyFlow.address)) {
        router.push({
          pathname: 'sign-up/address',
          params: {
            phone: stringPhoneSeparated
          }
        })
        return;
      }

      if (missingCacheInfo.includes(NameCacheKeyFlow.image)) {
        router.push({
          pathname: 'sign-up/image',
          params: {
            phone: stringPhoneSeparated
          }
        })
        return;
      }
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal({ ...error, phone });
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function appErrorVerifyErrorLocal(error: any): Promise<boolean> {
    const code = error?.response?.data?.code
    const codes = Object.keys(SignUpErrors)

    const existCodeInCodes = codes.includes(code.toString());
    if (!existCodeInCodes) {
      return true;
    }

    if (code === SignUpErrors[CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND].code) {
      router.replace('sign-up')
      return true
    }

    if (code === SignUpErrors[CACHE_GET_ERROR].code) {
      const phone = `${COUNTRY_CODE}${error.phone}`
      await createUserInfoCachePhone({
        phone
      })

      router.push({
        pathname: 'sign-up/account',
        params: {
          phone
        }
      })
      return true;
    }

    if (code === SignUpErrors[PHONE_NUMBER_CODE_CONFIRMATION_INCORRECT].code) {
      setErrorConfirmationCodeLocal("Código invalido! Tente novamente.")
    }

    return false;
  }

  async function phoneSendCodeConfirmationCreateClient(phone: string) {
    const phoneWithCountryCode = `${COUNTRY_CODE}${phone}`
    const separatePhone = separatePhoneInComponent(phoneWithCountryCode)
    try {
      const { expirationInMilliseconds } = await phoneSendCodeConfirmationCreateClientService(separatePhone)

      setExpirationTimeCodeConfirmationPhone(expirationInMilliseconds)
      setShowModalCodeConfirmation(true)
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal({ ...error, phone });
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function phoneResendCodeConfirmationCreateClient(phone: string) {
    const phoneWithCountryCode = `${COUNTRY_CODE}${phone}`
    const separatePhone = separatePhoneInComponent(phoneWithCountryCode)
    try {
      const { expirationInMilliseconds } = await phoneSendCodeConfirmationCreateClientService(separatePhone)

      setExpirationTimeCodeConfirmationPhone(expirationInMilliseconds)
    } catch (error) {
      if (await appErrorVerifyErrorLocal({ ...error, phone })) {
        return;
      }
      appErrorVerifyError(error)
    }
  }

  async function phoneVerifyCodeConfirmationCreateClient({ code, phone }: PhoneVerifyCodeConfirmationCreateClientParamsDto) {
    const separatePhone = separatePhoneInComponent(phone)
    const stringPhoneSeparated = JSON.stringify(separatePhone)
    try {
      await phoneVerifyCodeConfirmationCreateClientService({ ...separatePhone, code })
      setShowModalCodeConfirmation(false)
      router.push({
        pathname: 'sign-up/address',
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

  async function addressFindGeocodingReverse(data: AddressFindGeocodingReverseParamsDto): Promise<AddressFindGeocodingReverseResult> {
    try {
      const result = await addressFindGeocodingReverseService(data)
      return result;
    } catch (error) {
      if (await appErrorVerifyErrorLocal({ ...error, phone: '' })) {
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

  const contextValue = useMemo(() => ({
    isSignUpLoading,
    setIsSignUpLoading,
    verifyEmailToRegister,
    verifyAndCreatePhoneToRegister,
    createUserInfoCacheAccount,
    phoneSendCodeConfirmationCreateClient,
    phoneResendCodeConfirmationCreateClient,
    phoneVerifyCodeConfirmationCreateClient,
    showModalCodeConfirmation,
    expirationTimeCodeConfirmationPhone,
    closeModalCodeConfirmation,
    getLastTerm,
    loadingSignUp,
    setExpirationTimeCodeConfirmationPhone,
    errorConfirmationCodeLocal,
    setErrorConfirmationCodeLocal,
    addressFindGeocodingReverse,
    createUserInfoCacheAddress,
    createUserInfoCacheImage
  }), [
    isSignUpLoading,
    verifyEmailToRegister,
    verifyAndCreatePhoneToRegister,
    createUserInfoCacheAccount,
    phoneSendCodeConfirmationCreateClient,
    phoneResendCodeConfirmationCreateClient,
    phoneVerifyCodeConfirmationCreateClient,
    showModalCodeConfirmation,
    expirationTimeCodeConfirmationPhone,
    closeModalCodeConfirmation,
    getLastTerm,
    loadingSignUp,
    setExpirationTimeCodeConfirmationPhone,
    errorConfirmationCodeLocal,
    setErrorConfirmationCodeLocal,
    addressFindGeocodingReverse,
    createUserInfoCacheAddress,
    createUserInfoCacheImage
  ]);
  return (
    <SignUpContext.Provider
      value={contextValue}
    >
      {props.children}
    </SignUpContext.Provider>
  );
}

export const useSignUp = () => {
  const signUpContext = useContext(SignUpContext);

  return signUpContext;
};