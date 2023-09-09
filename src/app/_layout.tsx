import { Slot } from 'expo-router';
import { OnboardingProvider } from '../context/onboarding.context';
import { AuthProvider } from '../context/auth.context';

export default function Root() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <Slot />
      </OnboardingProvider>
    </AuthProvider>
  );
}