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
import { useSignUp } from "../../context/signup.context";
import { validatePhone } from "../../utils/validatePhoneNumber.utils";
import { useState } from "react";
import { formatPhone } from "../../utils/formatPhone.util";

const schema = yup
  .object({
    phone: yup.string().test("phone-validation", "Digite um telefone valido", (value) => {
      // Remove caracteres não numéricos
      const cleanValue = value.replace(/\D/g, "");
      // Verifica se é um CPF ou CNPJ válido
      return validatePhone(cleanValue)
    }).required("Um telefone é necessário!"),
  })
  .required()
interface FormData {
  phone: string
}
export default function SignUp() {
  const theme = useTheme();
  const { verifyPhoneToRegister } = useSignUp();
  const [phoneLocal, setPhoneLocal] = useState('')
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
    setValue
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleVerifyPhoneToRegister = async (data: FormData) => {
    await verifyPhoneToRegister(data.phone)
  }

  const handleTextChange = (text: string) => {
    // Formata o texto enquanto o usuário digita
    const formattedText = formatPhone(text)
    setPhoneLocal(formattedText)
    const cleanValue = formattedText.replace(/\D/g, "");
    setValue('phone', cleanValue)
  };

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Faça seu cadastro</Title>
          <Phrase>{`Vamos começar, \n     digite seu telefone!`}</Phrase>
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
              render={({ field: { onBlur } }) => (
                <Input
                  placeholder="(##) # ####-####"
                  onBlur={onBlur}
                  value={phoneLocal}
                  onChangeText={handleTextChange}
                  error={errors?.phone?.message}
                />
              )}
              name="phone"
            />
          </ContainerInput>
        </ContainerForm>
      </ContainerBody>
      <ContainerFooter>
        <ButtonBorder style={styleSmote}>
          <ButtonBorderSecond style={styleSmote}>
            <ButtonFirstStep
              onPress={handleSubmit(handleVerifyPhoneToRegister)}
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
