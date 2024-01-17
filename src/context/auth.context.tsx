import React, { useState } from 'react';
import { useError } from './errors.context';
import { verifyWithoutFlowInfoCacheByEmailService } from '../services/api/sign-up/verify-without-flow-info-cache-by-email.service';

const AuthContext = React.createContext<{ signIn: () => void; signOut: () => void; session?: string | null, isLoading: boolean } | null>(null);

// This hook can be used to access the user info.
export function AuthProvider(props) {
  const { appErrorVerifyError } = useError()
  // const [[isLoading, session], setSession] = useStorageState('session');
  const [isLoading, setIsLoading] = useState(false)
  const [session, setSession] = useState('')



  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          setSession('xxx');
        },
        signOut: () => {
          setSession('');
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = React.useContext(AuthContext);

  return value;
}