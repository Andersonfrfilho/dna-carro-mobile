import { TextInputProps } from 'react-native';
import { Container, ContainerBorder, ContainerInput, ContainerLabel, ContainerSecondBorder, InputComponent, Label } from './styles';
import { useTheme } from 'styled-components/native';

interface Props extends TextInputProps {
  messageLabel?: string;
}

export default function Input({ messageLabel, ...props }: Props) {
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
        {!!messageLabel && <Label>{messageLabel}</Label>}
      </ContainerLabel>
      <ContainerBorder style={styleSmote}>
        <ContainerSecondBorder>
          <ContainerInput style={styleSmote}>
            <InputComponent
              {...props}
            />
          </ContainerInput>
        </ContainerSecondBorder>
      </ContainerBorder>
    </Container>
  );
}