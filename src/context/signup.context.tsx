import React, { useContext } from "react";
import { api } from "../services/api/provider.service";
import { verifyWithoutFlowInfoCache } from "../services/api/services/verify-without-flow-info-cache.service";
import { useError } from "./errors.context";

interface SignUpContextInterface {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  const { appErrorVerifyError } = useError()
  const [isLoading, setIsLoading] =
    React.useState<boolean>(false);

  async function verifyEmailToRegister(email: string): Promise<void> {
    try {
      const data = await verifyWithoutFlowInfoCache(email)
      console.log(data)
    } catch (error) {
      appErrorVerifyError(error)
    }
  }

  return (
    <SignUpContext.Provider
      value={{
        isLoading,
        setIsLoading,
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