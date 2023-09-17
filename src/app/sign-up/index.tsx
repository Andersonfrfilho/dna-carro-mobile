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
import Input from "../../components/input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useTheme } from "styled-components/native";

const schema = yup
  .object({
    email: yup.string().email("Digite um email valido!").required("Um email é necessário!"),
  })
  .required()

export default function SignUp() {
  const theme = useTheme();

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

  const handleVerifyEmailToRegister = (data) => console.log(data)

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Faça seu cadastro</Title>
          <Phrase>{`Vamos começar, \n     digite seu email!`}</Phrase>
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
        </ContainerForm>
      </ContainerBody>
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
    </Container>
  );
}
