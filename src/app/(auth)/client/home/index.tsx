import {
  Container,
  ContainerBody,
  ContainerHeader,
  ContainerTitle,
  Phrase,
  Title,
} from "./styles";

export default function ChoseTypeUser() {

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Selecione a area</Title>
          <Phrase>{`Coloque seu login, \n     senha!`}</Phrase>
        </ContainerTitle>

      </ContainerHeader>
      <ContainerBody>

      </ContainerBody>
    </Container>
  );
}
