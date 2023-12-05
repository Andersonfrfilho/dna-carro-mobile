import React from "react";
import { CommonProvider } from "./common.context";
import { SignUpProvider } from "./signup/signup.context";

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
        <SignUpProvider>
          {props.children}
        </SignUpProvider>
      </CommonProvider>
    </ Context.Provider>
  );
}