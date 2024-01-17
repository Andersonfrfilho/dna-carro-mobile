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
import { useSignUp } from "../../context/sign-up/sign-up.context";
import { validatePhone } from "../../utils/validatePhoneNumber.utils";
import { useState } from "react";
import { formatPhone } from "../../utils/formatPhone.util";
import ButtonCircleBorder from "../../components/button-circle";

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
  const { verifyAndCreatePhoneToRegister } = useSignUp();
  const [phoneLocal, setPhoneLocal] = useState('')


  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    formState: { isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  })

  const handleVerifyPhoneToRegister = async (data: FormData) => {
    await verifyAndCreatePhoneToRegister(data.phone)
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
                  keyboardType="phone-pad"
                />
              )}
              name="phone"
            />
          </ContainerInput>
        </ContainerForm>
      </ContainerBody>
      <ContainerFooter>
        <ButtonCircleBorder
          title="Prosseguir"
          onPress={handleSubmit(handleVerifyPhoneToRegister)}
        />
      </ContainerFooter>
    </Container>
  );
}
