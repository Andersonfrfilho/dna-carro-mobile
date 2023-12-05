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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from "../../components/input";
import { useSignUp } from "../../context/signup/signup.context";
import { validateCPF } from "../../utils/validateCpf.util";
import { validateCNPJ } from "../../utils/validateCnpj.util";
import InputPassword from "../../components/inputPassword";
import { CNPJ_KEY, CPF_KEY, } from "../../constants/account";
import Loading from "../../components/loading";
import ButtonCircleBorder from "../../components/button-circle";
import { LogoImage } from "../initial/styles";
import { IMAGES } from "../../assets/images/images";
import { useState } from "react";

const schema = yup
  .object({
    user: yup.string().test("cpf-cnpj-validation", "documento inválido", (value?: string) => {
      // Remove caracteres não numéricos
      if (!value) {
        return false;
      }
      const cleanValue = value.replace(/\D/g, "");
      // Verifica se é um CPF ou CNPJ válido
      return cleanValue.length === 11 ? validateCPF(cleanValue) : validateCNPJ(cleanValue);
    }),
    userType: yup.string().oneOf([CPF_KEY, CNPJ_KEY], "Tipo de documento invalido").required("Selecione um tipo de documento!"),
    password: yup.string().min(6).required("Um password é necessário!"),
  })
  .required()

interface FormData {
  document: string;
  documentType: string;
  password: string;
}

export default function SignUpAccount() {
  const { createUserInfoCacheAccount, getLastTerm, loadingSignUp } = useSignUp();
  const [remember, setRemember] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
    clearErrors,
    setError
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleAccountPreparedToRegister = async (data: FormData) => {
    // await createUserInfoCacheAccount({
    //   user: data,
    //   phone: params.phone,
    //   term: data.term
    // })
  }

  const handleSwitchRemember = () => {
    setRemember((currentValue) => !currentValue)
  }

  const handleFormatUserInfo = (value: string) => {

  }


  if (loadingSignUp) {
    return (<ContainerLoading>
      <Loading />
    </ContainerLoading>)
  }

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Coloca seu usuário</Title>
          <Phrase>{`Coloque seu login, \n     senha!`}</Phrase>
        </ContainerTitle>
        <ContainerLogo>
          <LogoImage source={IMAGES.LOGO} />
        </ContainerLogo>
      </ContainerHeader>
      <ContainerBody>
        <ContainerInput>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                placeholder="Usuário"
                reference={ref}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.user?.message}
                onSubmitEditing={() => {
                  handleFormatUserInfo(value)
                  setFocus("password")
                }}
              />
            )}
            name="user"
          />
        </ContainerInput>
        <ContainerInput>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <InputPassword
                placeholder="Senha"
                referenceInput={ref}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.password?.message}
              />
            )}
            name="password"
          />
        </ContainerInput>
        <ContainerItens>
          <ContainerRememberSession onPress={handleSwitchRemember}>
            <Icon name={remember ? "toggle-switch" : "toggle-switch-off-outline"} />
            <Phrase>Lembrar-me</Phrase>
          </ContainerRememberSession>
          <ContainerForgotPassword>
            <Phrase>Esqueci a senha</Phrase>
          </ContainerForgotPassword>
        </ContainerItens>
        <ContainerButtons>
          <ButtonCircleBorder
            title={"Prosseguir"}
            onPress={handleSubmit(handleAccountPreparedToRegister)}
          />
        </ContainerButtons>
        <ContainerItens>
          <ContainerGoToRegister>
            <Phrase>Registrar</Phrase>
          </ContainerGoToRegister>
        </ContainerItens>
      </ContainerBody>
    </Container>
  );
}
