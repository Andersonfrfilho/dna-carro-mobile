import { Link, Redirect, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { useAuth } from '../../context/auth.context';


export default function AppLayout() {
  // const { session, isLoading } = useAuth();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (false) {
    console.log("########## - loading")
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (true) {
    console.log("########## - Home")
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/initial" />;
  }
  console.log("########## - Auth")
  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}