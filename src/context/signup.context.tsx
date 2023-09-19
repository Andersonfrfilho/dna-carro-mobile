import React, { useContext } from "react";
import { api } from "../services/api/provider.service";

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
  const [isLoading, setIsLoading] =
    React.useState<boolean>(false);

  async function verifyEmailToRegister(email: string): Promise<void> {
    try {
      console.log("#############")
      const { data } = await api.get(`/user/client/cache/${email}/without/flow`)
      console.log()

    } catch (error) {
      console.log(JSON.stringify(error, null, 2))
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