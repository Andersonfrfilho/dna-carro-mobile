import { TextInputProps } from 'react-native';
import { Container, ContainerBorder, ContainerInput, ContainerLabel, ContainerSecondBorder, InputComponent, Label } from './styles';
import { useTheme } from 'styled-components/native';

interface Props extends TextInputProps {
  error?: string;
}

export default function Input({ error, ...props }: Props) {
  const theme = useTheme()

  const styleSmote = {
    shadowColor: theme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.23,
    shadowRadius: 11.27,
    elevation: 14
  }

  return (
    <Container>
      <ContainerLabel>
        <Label>{error ?? ''}</Label>
      </ContainerLabel>
      <ContainerBorder style={styleSmote} error={error}>
        <ContainerSecondBorder error={error}>
          <ContainerInput style={styleSmote} error={error}>
            <InputComponent
              {...props}
              error={error}
            />
          </ContainerInput>
        </ContainerSecondBorder>
      </ContainerBorder>
    </Container>
  );
}