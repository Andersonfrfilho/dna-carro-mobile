import { useRootNavigation, useRouter, useSegments } from "expo-router";
import React, { useContext, useEffect, useState } from "react";

interface AuthContextValue {
  signIn: (e: string, p: string) => Promise<void>;
  signUp: (e: string, p: string, n: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: any | null;
  authInitialized: boolean;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

export function Provider(props: ProviderProps) {
  const [user, setAuth] =
    React.useState<any | null>(null);
  const [authInitialized, setAuthInitialized] = React.useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => { },
        signOut: () => { },
        signUp: () => { },
        user: null,
        authInitialized: null,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Define the useAuth hook
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
};