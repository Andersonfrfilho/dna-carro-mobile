import { TouchableHighlightProps } from 'react-native';
import { Container, ButtonBorder, Button, Icon } from './styles';
import { useTheme } from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface Props extends TouchableHighlightProps {
  readonly error?: string;
  readonly iconName: MaterialCommunityIconName;
}

export default function ButtonCircleIconBorder({ error, iconName, ...props }: Props) {
  const theme = useTheme()

  return (
    <Container style={theme.shadow}>
      <ButtonBorder style={theme.shadow}>
        <Button
          {...props}
          style={theme.shadow}
        >
          <Icon name={iconName} size={24} color={theme.colors.primary} />
        </Button>
      </ButtonBorder>
    </Container>
  );
}