import { TouchableHighlightProps } from 'react-native';
import { Container, ButtonBorder, Title, Button } from './styles';
import { useTheme } from 'styled-components/native';

interface Props extends TouchableHighlightProps {
  error?: string;
  title: string;
}

export default function ButtonCircleBorder({ error, title, ...props }: Props) {
  const theme = useTheme()

  return (
    <Container style={theme.shadow}>
      <ButtonBorder style={theme.shadow}>
        <Button
          {...props}
          style={theme.shadow}
        >
          <Title>{title}</Title>
        </Button>
      </ButtonBorder>
    </Container>
  );
}