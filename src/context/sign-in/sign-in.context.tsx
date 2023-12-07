import React, { useContext, useMemo } from "react";
import { useRouter } from "expo-router";
import { useError } from "../errors.context";
import { CreateSessionParamsDto } from "./dtos/sign-in.dto";
import { createSessionUserService } from "../../services/api/sign-in/create-session.service";
import { getSecurityStorageState, setSecurityStorageItemAsync } from "../../storage/secure/security.storage";
import { SIGN_IN_AUTH_REFRESH_TOKEN_STORAGE_SECURITY_KEY, SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY, SIGN_IN_REMEMBER_USER_STORAGE_SECURITY_KEY, SignInAuthRememberUserStorageSecurityKeyDto } from "../../storage/keys/sign-in.keys";


interface SignInContextInterface {
  isSignInLoading: boolean;
  setIsSignInLoading: React.Dispatch<React.SetStateAction<boolean>>;
  createSession(data: CreateSessionParamsDto): Promise<void>;
  getRememberMe(): Promise<SignInAuthRememberUserStorageSecurityKeyDto | null>;
}

// Define the Provider component
interface ProviderProps {
  readonly children: React.ReactNode;
}

// Create the AuthContext
const SignInContext = React.createContext<SignInContextInterface | undefined>(
  undefined
);

export function SignInProvider(props: ProviderProps) {
  const router = useRouter()
  const { appErrorVerifyError } = useError()
  const [isSignInLoading, setIsSignInLoading] =
    React.useState<boolean>(false);
  async function getRememberMe(): Promise<SignInAuthRememberUserStorageSecurityKeyDto | null> {
    const dataRememberMeStringFormat = await getSecurityStorageState<SignInAuthRememberUserStorageSecurityKeyDto>(SIGN_IN_REMEMBER_USER_STORAGE_SECURITY_KEY)
    return dataRememberMeStringFormat
  }

  async function createSession({ isRememberMe, ...data }: CreateSessionParamsDto) {
    try {

      if (isRememberMe) {
        const dataRememberMe = {
          user: data.user,
          userType: data.userType
        }
        const dataRememberMeStringFormat = JSON.stringify(dataRememberMe);
        await setSecurityStorageItemAsync(SIGN_IN_REMEMBER_USER_STORAGE_SECURITY_KEY, dataRememberMeStringFormat)
      }

      const { expireIn, expireInRefreshToken, refreshToken, token } = await createSessionUserService(data)
      const dataToken = {
        expireIn,
        token
      }
      const dataTokenStringFormat = JSON.stringify(dataToken);
      await setSecurityStorageItemAsync(SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY, dataTokenStringFormat)

      const dataRefreshToken = {
        expireInRefreshToken,
        refreshToken
      }
      const dataRefreshTokenStringFormat = JSON.stringify(dataRefreshToken);
      await setSecurityStorageItemAsync(SIGN_IN_AUTH_REFRESH_TOKEN_STORAGE_SECURITY_KEY, dataRefreshTokenStringFormat)
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    }
  }


  async function appErrorVerifyErrorLocal(error: any): Promise<boolean> {
    const code = error?.response?.data?.code
    // const codes = Object.keys(SignUpErrors)

    // const existCodeInCodes = codes.includes(code.toString());
    // if (!existCodeInCodes) {
    //   return true;
    // }

    // if (code === SignUpErrors[CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND].code) {
    //   router.replace('sign-up')
    //   return true
    // }

    return false;
  }




  const contextValue = useMemo(() => ({
    isSignInLoading,
    setIsSignInLoading,
    createSession
  }), [
    isSignInLoading,
    createSession,
    setIsSignInLoading
  ]);
  return (
    <SignInContext.Provider
      value={contextValue}
    >
      {props.children}
    </SignInContext.Provider>
  );
}

export const useSignIn = () => {
  const signInContext = useContext(SignInContext);

  return signInContext;
};