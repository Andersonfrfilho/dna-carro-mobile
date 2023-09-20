import React, { useContext, useState } from "react";
import { HTTP_ERROR_CODES_ENUM } from "../error/app.error";
import { useRouter } from "expo-router";
import { AXIOS_ERROR_NAME } from "../error/constants/axios.error";

export type ErrorData = {
  status_code: number;
  message: string;
  code?: string;
};

interface ErrorContextInterface {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  appErrorVerifyError: (err: any) => void;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const ErrorContext = React.createContext<ErrorContextInterface | undefined>(
  undefined
);

export function ErrorProvider(props: ProviderProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] =
    React.useState<boolean>(false);
  const [appError, setAppError] = useState<Partial<ErrorData>>({});

  function unknownServerError(err?: any): void {
    setAppError({});
  }

  function notFoundError(err: any): void {
    setAppError({});
  }

  function badRequestError(err: any): void {
    setAppError({});
  }

  function unauthorizedError(err: any): void {
    setAppError({});
  }

  function forbiddenError(err: any): void {
    setAppError({});
  }

  function internalServerError(err?: any): void {
    setAppError({});
  }

  function axiosError(): void {
    router.replace('internalServerError')
  }

  async function appErrorVerifyError(err: any) {
    console.error(JSON.stringify(err, null, 2))
    if (err.message === "Cannot read property '_raw' of undefined") {
      unknownServerError();
      return;
    }

    if (err.message === 'Network Error') {
      internalServerError();
      return;
    }
    if (err.response.status === HTTP_ERROR_CODES_ENUM.FORBIDDEN) {
      forbiddenError(err);
      return;
    }
    if (err.response.status === HTTP_ERROR_CODES_ENUM.UNAUTHORIZED) {
      unauthorizedError(err);
      return;
    }
    if (err.response.status === HTTP_ERROR_CODES_ENUM.BAD_REQUEST) {
      badRequestError(err);
      return;
    }
    if (err.response.status === HTTP_ERROR_CODES_ENUM.NOT_FOUND) {
      notFoundError(err);
      return;
    }
    if (err.response.status === HTTP_ERROR_CODES_ENUM.INTERNAL_SERVER_ERROR) {
      if (err.response.data.code === '50001') {
        notFoundError(err);
        return;
      }
    }
    if (err.name === AXIOS_ERROR_NAME) {
      axiosError();
    }
    unknownServerError();
  }
  return (
    <ErrorContext.Provider
      value={{
        isLoading,
        setIsLoading,
        appErrorVerifyError
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
}

// Define the useAuth hook
export const useError = () => {
  const errorContext = useContext(ErrorContext);

  return errorContext;
};