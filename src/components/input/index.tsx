import { TextInput, TextInputProps } from 'react-native';
import { Container, InputComponent } from './styles';

interface Props extends TextInputProps { }

export default function Input(props: Props) {
  return (
    <Container>
      <InputComponent
        {...props}
      />
    </Container>
  );
}