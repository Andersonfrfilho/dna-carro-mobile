import React, { useContext } from "react";

interface CommonContextInterface {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const CommonContext = React.createContext<CommonContextInterface | undefined>(
  undefined
);

export function CommonProvider(props: ProviderProps) {
  const [isLoading, setIsLoading] =
    React.useState<boolean>(false);

  return (
    <CommonContext.Provider
      value={{
        isLoading,
        setIsLoading
      }}
    >
      {props.children}
    </CommonContext.Provider>
  );
}

// Define the useAuth hook
export const useCommon = () => {
  const commonContext = useContext(CommonContext);

  return commonContext;
};