import { useRouter } from "expo-router";
import ButtonRectangleBorder from "../../../components/button-rectangle";
import {
  Container,
  ContainerBody,
  ContainerButton,
  ContainerButtonClose,
  ContainerButtons,
  ContainerHeader,
  ContainerTitle,
  IconClose,
  Phrase,
  Title,
} from "./styles";
import { useSignIn } from "../../../context/sign-in/sign-in.context";
import { useEffect } from "react";

export default function ChoseTypeUser() {
  const router = useRouter()
  const { getTypes } = useSignIn()

  useEffect(() => {
    (async () => {
      const types = await getTypes()
      if (types.length < 2) {
        router.replace('/provider/home');
      }
    })()
  }, [])

  function handleGoToProvider() {
    router.push('/provider/home')
  }
  function handleGoToClient() {
    router.push('/client/home')
  }
  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Selecione a area</Title>
          <Phrase>{`Parece que você tem um perfil múltiplo, \n     selecione seu perfil hoje!`}</Phrase>
        </ContainerTitle>
        <ContainerButtonClose>
          <IconClose
            name="close"
          />
        </ContainerButtonClose>
      </ContainerHeader>
      <ContainerBody>
        <ContainerButtons>
          <ContainerButton>
            <ButtonRectangleBorder
              title="Provedor"
              onPress={handleGoToProvider}
            />
          </ContainerButton>
          <ContainerButton>
            <ButtonRectangleBorder
              title="Cliente"
              onPress={handleGoToClient}
            />
          </ContainerButton>
        </ContainerButtons>
      </ContainerBody>
    </Container>
  );
}
