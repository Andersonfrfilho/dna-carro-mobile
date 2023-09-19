import React, { useContext } from "react";

interface ErrorContextInterface {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isLoading, setIsLoading] =
    React.useState<boolean>(false);

  return (
    <ErrorContext.Provider
      value={{
        isLoading,
        setIsLoading
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
}

// Define the useAuth hook
export const useError = () => {
  const ErrorContext = useContext(ErrorContext);

  return ErrorContext;
};