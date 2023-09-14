import { Container, ContainerBody, ContainerButton, ContainerForm, ContainerHeader, ContainerInput, ContainerLink, ContainerLinks, ContainerLogo, ContainerTitle, Link, Title } from './styles';
import Logo from '../../components/logo';
import { Button } from 'react-native';
import Input from '../../components/input';


export default function SignIn() {
  return (
    <Container>
      <ContainerHeader>
        <ContainerLogo>
          <Logo />
        </ContainerLogo>
      </ContainerHeader>
      <ContainerBody>
        <ContainerTitle>
          <Title>Login</Title>
        </ContainerTitle>
        <ContainerForm>
          <ContainerInput>
            <Input
              placeholder='telefone:'
            />
          </ContainerInput>
          <ContainerInput>
            <Input />
          </ContainerInput>
          <ContainerLinks>
            <ContainerLink>
              <Link>Criar conta</Link>
            </ContainerLink>
            <ContainerLink>
              <Link>Esqueci a senha</Link>
            </ContainerLink>
          </ContainerLinks>
        </ContainerForm>
        <ContainerButton>
          <Button
            title='entrar'
          />
        </ContainerButton>
      </ContainerBody>
    </Container>
  );
}