import React, { useContext } from "react";
import { verifyWithoutFlowInfoCacheByEmailService } from "../services/api/services/verify-without-flow-info-cache-by-email.service";
import { useError } from "./errors.context";
import { CACHE_GET_ERROR, SignUpErrors } from "../error/constants/signup.constant.error";
import { useRouter } from "expo-router";
import { CreateUserInfoCacheServicePropsDto, createUserInfoCacheService } from "../services/api/services/create-user-info-cache.service";
import { verifyWithoutFlowInfoCacheByPhoneService } from "../services/api/services/verify-without-flow-info-cache-by-phone.service";
import { CreateUserInfoCacheContextParamsDto } from "./dtos/signup.dto";
import { separatePhoneInComponent } from "../utils/separatePhoneInComponent.util";
import { setInfoCache } from "../providers/cache/cache";
import { CREATE_USER_INFO_CACHE } from "../storage/keys/signup.keys";

import { getDateUnix } from "../utils/getDate.util";
import { DOCUMENT_TYPES, GENDER_TYPES } from "../constants/account";
import { COUNTRY_CODE } from "./constants/account.constant";

interface SignUpContextInterface {
  isSignUpLoading: boolean;
  setIsSignUpLoading: React.Dispatch<React.SetStateAction<boolean>>;
  verifyEmailToRegister: (email: string) => Promise<void>;
  verifyPhoneToRegister: (phone: string) => Promise<void>;
  createUserInfoCacheAccount: (data: CreateUserInfoCacheContextParamsDto) => Promise<void>;
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

  async function createUserInfoCacheAccount(data: CreateUserInfoCacheContextParamsDto) {
    const { user, phone } = data;
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

    const formatInfos: CreateUserInfoCacheServicePropsDto = {
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

    try {
      await createUserInfoCacheService(formatInfos)

      await setInfoCache<CreateUserInfoCacheServicePropsDto>({ key: CREATE_USER_INFO_CACHE, data: formatInfos })

      router.push({
        pathname: 'sign-up/phone',
        params: {
          phone: separatePhone
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
      const data = await verifyWithoutFlowInfoCacheByPhoneService(phone)

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
          phone: `${COUNTRY_CODE}error.phone`
        }
      })
      return true;
    }

    return false;
  }

  return (
    <SignUpContext.Provider
      value={{
        isSignUpLoading,
        setIsSignUpLoading,
        verifyEmailToRegister,
        verifyPhoneToRegister,
        createUserInfoCacheAccount
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