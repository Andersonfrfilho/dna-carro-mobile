import { Stack } from 'expo-router';

export default function home() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}