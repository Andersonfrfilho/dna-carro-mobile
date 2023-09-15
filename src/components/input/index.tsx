import { Text, TextInput, TextInputProps } from 'react-native';
import { Container, ContainerBorder, ContainerInput, ContainerLabel, ContainerSecondBorder, InputComponent, Label } from './styles';

interface Props extends TextInputProps {
  messageLabel?: string;
}

export default function Input({ messageLabel, ...props }: Props) {
  const styleSmote = {
    shadowColor: "#000000",
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