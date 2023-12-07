import {
  Container,
  ContainerBody,
  ContainerHeader,
  ContainerInput,
  ContainerTitle,
  Phrase,
  Title,
  ContainerLoading,
  ContainerLogo,
  ContainerButtons,
  ContainerItens,
  ContainerRememberSession,
  ContainerForgotPassword,
  Icon,
  ContainerGoToRegister,
} from "./styles";

export default function SignUpAccount() {

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Coloca seu usuário</Title>
          <Phrase>{`Coloque seu login, \n     senha!`}</Phrase>
        </ContainerTitle>

      </ContainerHeader>
      <ContainerBody>

      </ContainerBody>
    </Container>
  );
}
