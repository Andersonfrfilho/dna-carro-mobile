import { useRouter } from "expo-router";
import {
  ButtonSignIn,
  ButtonSignUp,
  Container,
  ContainerBody,
  ContainerForm,
  ContainerHeader,
  ContainerImage,
  ContainerSignIn,
  ContainerSignUp,
  ContainerTitle,
  LogoImage,
  Phrase,
  Title,
  TitleButton,
} from "./styles";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Input from "../../components/input";

export default function SignUp() {
  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Faça seu cadastro</Title>
          <Phrase>{`Vamos começar, \n     digite seu email!`}</Phrase>
        </ContainerTitle>
      </ContainerHeader>
      <ContainerBody>
        <ContainerForm >
          <Input />
        </ContainerForm>
      </ContainerBody>
    </Container>
  );
}
