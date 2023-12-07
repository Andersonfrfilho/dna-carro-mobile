import { Slot, SplashScreen } from 'expo-router';
import { OnboardingProvider } from '../context/onboarding.context';
import { AuthProvider } from '../context/auth.context';
import Theme from '../style/theme.style';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { CommonProvider } from '../context/common.context';
import { ErrorProvider } from '../context/errors.context';
import { SignInProvider } from '../context/sign-in/sign-in.context';

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/fonts/Inter-VariableFont_slnt.ttf'),
    'Helvetica-Neue-Medium-Extended': require('../assets/fonts/Helvetica-Neue-Medium-Extended.ttf'),
    'Helvetica-Neue-UltraLight': require('../assets/fonts/Helvetica-Neue-UltraLight.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-ThinItalic': require('../assets/fonts/Lato-ThinItalic.ttf'),
    'Lato-BlackItalic': require('../assets/fonts/Lato-BlackItalic.ttf'),
    'Lato-Thin': require('../assets/fonts/Lato-Thin.ttf'),
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Lato-BoldItalic': require('../assets/fonts/Lato-BoldItalic.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Lato-Italic': require('../assets/fonts/Lato-Italic.ttf'),
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
    'Lato-LightItalic': require('../assets/fonts/Lato-LightItalic.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1500);
    }
  }, [fontsLoaded]);

  return (
    <Theme>
      <CommonProvider>
        <ErrorProvider>
          <AuthProvider>
            <OnboardingProvider>
              <SignInProvider>
                <Slot />
              </SignInProvider>
            </OnboardingProvider>
          </AuthProvider>
        </ErrorProvider>
      </CommonProvider>
    </Theme >
  );
}