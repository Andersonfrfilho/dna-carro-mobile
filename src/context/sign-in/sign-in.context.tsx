import React, { useContext, useEffect, useMemo } from "react";
import { useRouter } from "expo-router";
import { useError } from "../errors.context";
import { CreateSessionParamsDto, GetUsersTypesResultDto, UserTypesDto, UserTypesResultDto, VerifyUserProviderTypeParamsDto } from "./dtos/sign-in.dto";
import { createSessionUserService } from "../../services/api/sign-in/create-session.service";
import { getSecurityStorageState, removeSecurityByKeysItemsAsync, removeSecurityStorageAll, setSecurityStorageItemAsync } from "../../storage/secure/security.storage";
import { SIGN_IN_AUTH_REFRESH_TOKEN_STORAGE_SECURITY_KEY, SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY, SIGN_IN_REMEMBER_USER_STORAGE_SECURITY_KEY, SignInAuthRememberUserStorageSecurityKeyDto } from "../../storage/keys/sign-in.keys";
import { ERRORS_TO_RESET_SESSION, SignInErrors } from "./sign-in.error";
import { getUserTypesService } from "../../services/api/sign-in/get-types.service";
import { getUserTypesInitialValue } from "./initial.context";
import { NUMBER_USER_TYPES_TO_ACCESS_CHOICE_TYPE, PROVIDER_USER_TYPE_ID } from "../constants/account.constant";


interface SignInContextInterface {
  isSignInLoading: boolean;
  setIsSignInLoading: React.Dispatch<React.SetStateAction<boolean>>;
  createSession(data: CreateSessionParamsDto): Promise<void>;
  getRememberMe(): Promise<SignInAuthRememberUserStorageSecurityKeyDto | null>;
  errorLocalSignInContext: string;
  setErrorLocalSignInContext: React.Dispatch<React.SetStateAction<string>>;
  hasSession: boolean;
  getUsersTypes(): Promise<GetUsersTypesResultDto>;
  userTypes: UserTypesResultDto
  verifyUserProviderType(params: VerifyUserProviderTypeParamsDto): boolean
  logout(): Promise<void>;
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
  const [errorLocalSignInContext, setErrorLocalSignInContext] =
    React.useState<string>("");
  const [hasSession, setHasSession] = React.useState<boolean>(false);
  const [userTypes, setUserTypes] = React.useState<UserTypesDto>(getUserTypesInitialValue)

  useEffect(() => {
    (async () => {
      await verifyHasSessionToken()
    })()
  }, [])

  function verifyUserProviderType(params: VerifyUserProviderTypeParamsDto): boolean {
    return !!params && !!params.userTypesUsers && params.userTypesUsers.length >= NUMBER_USER_TYPES_TO_ACCESS_CHOICE_TYPE && params.userTypesUsers.some(userType => userType.userTypeId === PROVIDER_USER_TYPE_ID && userType.active)
  }

  async function getRememberMe(): Promise<SignInAuthRememberUserStorageSecurityKeyDto | null> {
    const dataRememberMeStringFormat = await getSecurityStorageState<SignInAuthRememberUserStorageSecurityKeyDto>(SIGN_IN_REMEMBER_USER_STORAGE_SECURITY_KEY)
    return dataRememberMeStringFormat
  }

  async function verifyHasSessionToken(): Promise<void> {
    setIsSignInLoading(true)
    try {
      const session = await getSecurityStorageState<SignInAuthRememberUserStorageSecurityKeyDto>(SIGN_IN_REMEMBER_USER_STORAGE_SECURITY_KEY)
      if (session) {
        setHasSession(true)
        return;
      }
      setHasSession(false)
    } catch { } finally {
      setIsSignInLoading(false)
    }
  }
  async function createSession({ isRememberMe, ...data }: CreateSessionParamsDto) {
    try {
      setIsSignInLoading(true)
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
      router.push('(auth)/choose-type-user')
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    } finally {
      setIsSignInLoading(false)
    }
  }

  async function getUsersTypes(): Promise<GetUsersTypesResultDto> {
    try {
      setIsSignInLoading(true)
      const userTypes = await getUserTypesService()
      setUserTypes(userTypes)
      return userTypes;
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    } finally {
      setIsSignInLoading(false)
    }
  }

  async function appErrorVerifyErrorLocal(error: any): Promise<boolean> {
    const code = error?.response?.data?.code || error?.code

    const codes = Object.keys(SignInErrors)

    const existCodeInCodes = codes.includes(code.toString());

    if (existCodeInCodes) {
      if (ERRORS_TO_RESET_SESSION.includes(code.toString())) {
        await removeSecurityStorageAll();
        router.replace('/sign-in')
        return;
      }
    }

    setErrorLocalSignInContext(SignInErrors[code].reason)
    return false;
  }

  async function logout(): Promise<void> {
    try {
      setIsSignInLoading(true)
      const keys = [
        SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY,
        SIGN_IN_AUTH_REFRESH_TOKEN_STORAGE_SECURITY_KEY,
        SIGN_IN_REMEMBER_USER_STORAGE_SECURITY_KEY
      ]
      await removeSecurityByKeysItemsAsync(keys)

      router.replace('/sign-in')
    } catch (error) {
      const isLocalError = await appErrorVerifyErrorLocal(error);
      if (isLocalError) {
        return;
      }
      appErrorVerifyError(error)
    } finally {
      setIsSignInLoading(false)
    }
  }

  const contextValue = useMemo(() => ({
    isSignInLoading,
    setIsSignInLoading,
    createSession,
    getRememberMe,
    errorLocalSignInContext,
    setErrorLocalSignInContext,
    hasSession,
    getUsersTypes,
    userTypes,
    verifyUserProviderType,
    logout
  }), [
    isSignInLoading,
    createSession,
    setIsSignInLoading,
    getRememberMe,
    errorLocalSignInContext,
    setErrorLocalSignInContext,
    hasSession,
    getUsersTypes,
    userTypes,
    verifyUserProviderType,
    logout
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