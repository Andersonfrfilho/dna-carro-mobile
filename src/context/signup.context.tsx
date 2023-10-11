import React, { useContext } from "react";
import { api } from "../services/api/provider.service";
import { verifyWithoutFlowInfoCache } from "../services/api/services/verify-without-flow-info-cache.service";
import { useError } from "./errors.context";
import { SignUpErrors } from "../error/constants/signup.constant.error";
import { useRouter } from "expo-router";
import { CreateUserInfoCacheContextPropsDto } from "./signup.types";
import { CreateUserInfoCacheServicePropsDto } from "../services/api/services/create-user-info-cache.service";

interface SignUpContextInterface {
  isSignUpLoading: boolean;
  setIsSignUpLoading: React.Dispatch<React.SetStateAction<boolean>>;
  verifyEmailToRegister: (email: string) => Promise<void>;
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

  async function createUserInfoCache(data: CreateUserInfoCacheContextPropsDto) {
    const { document, documentType, email, lastName, name, password } = data;
    const formatInfos: CreateUserInfoCacheServicePropsDto = {
      user: {
        birthDate,
        document,
        documentType,
        email,
        gender,
        lastName,
        name,
        password
      }
    }
  }

  async function verifyEmailToRegister(email: string): Promise<void> {
    try {
      const data = await verifyWithoutFlowInfoCache(email)
    } catch (error) {
      if (appErrorVerifyErrorLocal({ ...error, email })) {
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

    if (code === SignUpErrors[1031].code) {
      router.push({
        pathname: 'sign-up/account', params: {
          email: error.email
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
        verifyEmailToRegister
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