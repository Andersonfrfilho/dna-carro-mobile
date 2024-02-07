import { Drawer } from "expo-router/drawer";
import CustomDrawer from "../../../../components/custom-drawer";
import { DrawerContentComponentProps } from "@react-navigation/drawer";


export default function ProviderAuthDrawerRoutes() {
  return (
    <Drawer drawerContent={(props: DrawerContentComponentProps) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="sections" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Home',
          title: 'overview',
        }}
      />
    </Drawer>
  );
}
