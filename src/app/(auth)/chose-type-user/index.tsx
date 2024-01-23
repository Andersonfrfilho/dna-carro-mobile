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
import Loading from "../../../components/loading";

export default function ChoseTypeUser() {
  const router = useRouter()
  const { getUsersTypes, verifyUserProviderType, isSignInLoading } = useSignIn()

  useEffect(() => {
    (async () => {
      const userTypes = await getUsersTypes()
      if (!verifyUserProviderType(userTypes)) {
        router.replace('/client/home')
      }
    })()
  }, [])

  function handleGoToProvider() {
    router.push('/provider/home')
  }
  function handleGoToClient() {
    router.push('/client/home')
  }

  if (isSignInLoading) {
    return <Loading />
  }

  return (
    <Container>
      <ContainerHeader>
        <ContainerButtonClose>
          <IconClose
            name="close"
          />
        </ContainerButtonClose>
        <ContainerTitle>
          <Title>Selecione a area</Title>
          <Phrase>{`Parece que você tem um perfil múltiplo, \n     selecione seu perfil hoje!`}</Phrase>
        </ContainerTitle>
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
