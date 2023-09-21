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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useTheme } from "styled-components/native";
import Input from "../../../components/input";
import { useSignUp } from "../../../context/signup.context";
import { ScrollView, StatusBar, StyleSheet, Text } from "react-native";

const schema = yup
  .object({
    name: yup.string().required("Um nome é necessário!"),
    lastName: yup.string().required("Um sobrenome é necessário!"),
    email: yup.string().email("Digite um email valido!").required("Um email é necessário!"),
    document: yup.string().required("Um sobrenome é necessário!"),
    password: yup.string().required("Um sobrenome é necessário!"),
    confirmPassword: yup.string().required("Um sobrenome é necessário!"),
  })
  .required()
interface FormData {
  email: string
}
export default function SignUp() {
  const theme = useTheme();
  const { verifyEmailToRegister } = useSignUp();
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleVerifyEmailToRegister = async (data: FormData) => {
    await verifyEmailToRegister(data.email)
  }

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Vamos começar</Title>
          <Phrase>{`Preencha seus dados, \n     Pessoais!`}</Phrase>
        </ContainerTitle>
      </ContainerHeader>
      <ContainerBody>
        <ContainerForm>
          <ContainerInput>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Nome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.email?.message}
                />
              )}
              name="name"
            />
          </ContainerInput>
          <ContainerInput>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Sobrenome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.email?.message}
                />
              )}
              name="lastName"
            />
          </ContainerInput>
          <ContainerInput>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Em@il"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.email?.message}
                />
              )}
              name="email"
            />
          </ContainerInput>
          <ContainerInput>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Documento"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.email?.message}
                />
              )}
              name="document"
            />
          </ContainerInput>
          <ContainerInput>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Senha"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.email?.message}
                />
              )}
              name="password"
            />
          </ContainerInput>
          <ContainerInput>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Confirme senha"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.email?.message}
                />
              )}
              name="confirmPassword"
            />
          </ContainerInput>
          <ContainerFooter>
            <ButtonBorder style={styleSmote}>
              <ButtonBorderSecond style={styleSmote}>
                <ButtonFirstStep
                  onPress={handleSubmit(handleVerifyEmailToRegister)}
                  style={styleSmote}
                >
                  <TitleButton>Prosseguir</TitleButton>
                </ButtonFirstStep>
              </ButtonBorderSecond>
            </ButtonBorder>
          </ContainerFooter>
        </ContainerForm>
      </ContainerBody>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});