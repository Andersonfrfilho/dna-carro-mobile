import { Redirect } from 'expo-router';
import { Text } from 'react-native';
import { useSignIn } from '../../context/sign-in/sign-in.context';


export default function AppLayout() {
  const { hasSession, isSignInLoading } = useSignIn();
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isSignInLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (hasSession) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="(auth)/choose-type-user" />;
  }
  // This layout can be deferred because it's not the root layout.
  return <Redirect href="/initial" />;
}