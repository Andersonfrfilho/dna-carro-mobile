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
import { Controller, set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from "../../components/input";
import { validateCPF } from "../../utils/validateCpf.util";
import { validateCNPJ } from "../../utils/validateCnpj.util";
import InputPassword from "../../components/inputPassword";
import { ACCOUNT_USER_TYPES, ACCOUNT_USER_TYPES_LENGTH, CNPJ_KEY, CPF_KEY, EMAIL_KEY, PASSWORD_MINIMAL_LENGTH, PHONE_KEY, } from "../../constants/account";
import Loading from "../../components/loading";
import ButtonCircleBorder from "../../components/button-circle";
import { LogoImage } from "../initial/styles";
import { IMAGES } from "../../assets/images/images";
import { useEffect, useState } from "react";
import { containsOnlyNumber } from "../../utils/containsOnlyNumber.utils";
import { validatePhone } from "../../utils/validatePhoneNumber.utils";
import { validateEmail } from "../../utils/validateEmail.utils";
import { formatCPF } from "../../utils/formatCpf.util";
import { formatPhone } from "../../utils/formatPhone.util";
import { formatCNPJ } from "../../utils/formatCnpj.util";
import { useSignIn } from "../../context/sign-in/sign-in.context";
import { CreateSessionParamsDto } from "../../context/sign-in/dtos/sign-in.dto";
import { useRouter } from "expo-router";

const schema = yup
  .object({
    user: yup.string().required("digite o document (cpf ou cnpj), telefone ou email").lowercase(),
    userType: yup.string().oneOf(Object.values(ACCOUNT_USER_TYPES), "Tipo de documento invalido").required("Selecione um tipo de documento!"),
    password: yup.string().min(PASSWORD_MINIMAL_LENGTH, "Password deve ter no mínimo 6 caracteres").required("Um password é necessário!"),
  })
  .required()

interface FormData extends CreateSessionParamsDto { }

export default function SignInAccount() {
  const router = useRouter()
  const { isSignInLoading, createSession, getRememberMe, errorLocalSignInContext, setErrorLocalSignInContext } = useSignIn()
  const [remember, setRemember] = useState(false);
  const [userValue, setUserValue] = useState('')
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
    clearErrors,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const handleAccountCreateSession = async (data: FormData) => {
    await createSession({ ...data, isRememberMe: remember })
  }

  const handleSwitchRemember = () => {
    setRemember((currentValue) => !currentValue)
  }

  const handleFormatUserInfo = (value: string) => {
    const hasOnlyNumber = containsOnlyNumber(value)
    if (hasOnlyNumber) {
      if (value.length > ACCOUNT_USER_TYPES_LENGTH[CPF_KEY]) {
        const validDocument = validateCNPJ(value)
        if (validDocument) {
          setValue("userType", ACCOUNT_USER_TYPES[CNPJ_KEY])
          setValue("user", value)
          const formatValue = formatCNPJ(value)
          setUserValue(formatValue)
          clearErrors("user")
        } else {
          setError("user", {
            type: "validation",
            message: "CNPJ inválido",
          })
        }
      } else {
        const validCpf = validateCPF(value)
        if (validCpf) {
          setValue("userType", ACCOUNT_USER_TYPES[CPF_KEY])
          setValue("user", value)
          const formatValue = formatCPF(value)
          setUserValue(formatValue)
          clearErrors("user")
          return;
        } else {
          const phoneValidate = validatePhone(value)
          if (phoneValidate) {
            setValue("userType", ACCOUNT_USER_TYPES[PHONE_KEY])
            setValue("user", value)
            const formatValue = formatPhone(value)
            setUserValue(formatValue)
            clearErrors("user")
            return;
          } else {
            setError("user", {
              type: "validation",
              message: "telefone inválido",
            })
            return;
          }
        }
      }
    } else {
      const emailIsValid = validateEmail(value)
      if (emailIsValid) {
        setValue("userType", ACCOUNT_USER_TYPES[EMAIL_KEY])
        setValue("user", value)
        clearErrors("user")
        return;
      } else {
        setError("user", {
          type: "validation",
          message: "email inválido",
        })
        return;
      }
    }
  }

  function handleGoToRegister() {
    router.push("sign-up");
  }

  function handleGoToRememberPassword() {
    router.push({ pathname: "forgot-password", params: { user: userValue || '' } });
  }

  useEffect(() => {
    (async () => {
      const data = await getRememberMe()
      if (data) {
        setRemember(true)
        handleFormatUserInfo(data.user);
      } else {
        setRemember(false)
      }
    })()
  }, [])

  useEffect(() => {
    if (errorLocalSignInContext) {
      setError('user', { message: errorLocalSignInContext })
      setError('password', { message: errorLocalSignInContext })
    }
    setErrorLocalSignInContext("")
  }, [errorLocalSignInContext])

  if (isSignInLoading) {
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
            render={({ field: { onBlur, ref } }) => (
              <Input
                placeholder="Usuário"
                reference={ref}
                onBlur={onBlur}
                onChangeText={setUserValue}
                value={userValue}
                error={errors?.user?.message}
                onSubmitEditing={() => {
                  handleFormatUserInfo(userValue)
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
          <ContainerForgotPassword onPress={handleGoToRememberPassword}>
            <Phrase>Esqueci a senha</Phrase>
          </ContainerForgotPassword>
        </ContainerItens>
        <ContainerButtons>
          <ButtonCircleBorder
            title={"Prosseguir"}
            onPress={handleSubmit(handleAccountCreateSession)}
          />
        </ContainerButtons>
        <ContainerItens>
          <ContainerGoToRegister onPress={handleGoToRegister}>
            <Phrase>Registrar</Phrase>
          </ContainerGoToRegister>
        </ContainerItens>
      </ContainerBody>
    </Container>
  );
}
