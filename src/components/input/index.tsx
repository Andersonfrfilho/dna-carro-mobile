import { TextInputProps } from 'react-native';
import { Container, ContainerBorder, ContainerInput, ContainerLabel, ContainerSecondBorder, InputComponent, Label } from './styles';
import { useTheme } from 'styled-components/native';
import { RefCallBack } from 'react-hook-form';

interface Props extends TextInputProps {
  error?: string;
  reference?: RefCallBack;
}

export default function Input({ error, reference, ...props }: Props) {
  const theme = useTheme()


  return (
    <Container>
      <ContainerLabel>
        <Label>{error ?? ''}</Label>
      </ContainerLabel>
      <ContainerBorder style={theme.shadow} error={error}>
        <ContainerSecondBorder error={error}>
          <ContainerInput style={theme.shadow} error={error}>
            <InputComponent
              {...props}
              error={error}
              ref={reference}
            />
          </ContainerInput>
        </ContainerSecondBorder>
      </ContainerBorder>
    </Container>
  );
}