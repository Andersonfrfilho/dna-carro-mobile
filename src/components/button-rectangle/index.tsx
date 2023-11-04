import { TouchableHighlightProps } from 'react-native';
import { Container, ButtonBorder, Title, Button, ContainerLabel, Label, ContainerBorder, } from './styles';
import { useTheme } from 'styled-components/native';

interface Props extends TouchableHighlightProps {
  readonly error?: string;
  readonly title: string;
}

export default function ButtonRectangleBorder({ error, title, ...props }: Props) {
  const theme = useTheme()

  return (
    <Container>
      {!!error && <ContainerLabel>
        <Label>{error ?? ''}</Label>
      </ContainerLabel>}
      <ContainerBorder error={error}>
        <ButtonBorder style={theme.shadow} error={error}>
          <Button
            {...props}
            style={theme.shadow}
            error={error}
          >
            <Title error={error}>{title}</Title>
          </Button>
        </ButtonBorder>
      </ContainerBorder>
    </Container>
  );
}