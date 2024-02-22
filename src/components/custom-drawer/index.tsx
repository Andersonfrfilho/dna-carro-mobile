import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useSignIn } from '../../context/sign-in/sign-in.context';
import { IconLogout } from './styles';

interface CustomDrawerContentProps extends DrawerContentComponentProps {
}

export default function CustomDrawer(props: React.FC<CustomDrawerContentProps>) {
  const { logout } = useSignIn()
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={"Sair"} onPress={logout} icon={({ color, size }) => <IconLogout name="logout" color={color} size={size} />} />
    </DrawerContentScrollView>
  );
}