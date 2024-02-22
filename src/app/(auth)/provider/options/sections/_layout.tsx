import { Tabs } from 'expo-router/tabs';
export default function ProviderAuthTabsRoutes() {
  return (
    <Tabs
      initialRouteName='home'
      backBehavior="history"
    >
      <Tabs.Screen
        name="home"
        options={{
          href: "provider/options/sections/home",
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          href: "provider/options/sections/appointments",
          tabBarLabel: 'Agendamentos',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="registers"
        options={{
          href: "provider/options/sections/registers",
          tabBarLabel: 'Registros',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}