import React from "react";
import { CommonProvider } from "./common.context";

interface ContextsInterface {
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const Context = React.createContext<ContextsInterface | undefined>(
  undefined
);

export function OnboardingProvider(props: ProviderProps) {
  return (
    <Context.Provider value={null} >
      <CommonProvider>
        {props.children}
      </CommonProvider>
    </ Context.Provider>
  );
}