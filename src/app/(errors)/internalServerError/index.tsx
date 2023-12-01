import {
  ButtonBorder,
  ButtonBorderSecond,
  ButtonFirstStep,
  Container,
  ContainerBody,
  ContainerFooter,
  ContainerForm,
  ContainerHeader,
  ContainerInput,
  ContainerTitle,
  Phrase,
  Title,
  TitleButton,
} from "./styles";
import { Controller } from "react-hook-form";
import * as yup from "yup"
import { useTheme } from "styled-components/native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { Text } from "react-native";

const schema = yup
  .object({
    email: yup.string().email("Digite um email valido!").required("Um email é necessário!"),
  })
  .required()
interface FormData {
  email: string
}
export default function InternalServerError() {
  const router = useRouter()
  const theme = useTheme();


  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Ops, Algo deu errado</Title>
          <Phrase>{`Tivemos um erro inesperado, \n     vamos prosseguir!`}</Phrase>
        </ContainerTitle>
      </ContainerHeader>
      <ContainerBody>
        <LottieView style={{ width: '100%', height: '100%' }} source={require("../../../assets/animations/errors/internalServerError.json")} autoPlay />
      </ContainerBody>
      <ContainerFooter>
        <ButtonBorder style={theme.shadow}>
          <ButtonBorderSecond style={theme.shadow}>
            <ButtonFirstStep
              onPress={() => router.replace('initial')}
              style={theme.shadow}
            >
              <TitleButton>Prosseguir</TitleButton>
            </ButtonFirstStep>
          </ButtonBorderSecond>
        </ButtonBorder>
      </ContainerFooter>
    </Container>
  );
}
