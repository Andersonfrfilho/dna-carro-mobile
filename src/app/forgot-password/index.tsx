import {
  Container,
  ContainerBody,
  ContainerButton,
  ContainerFooter,
  ContainerForm,
  ContainerHeader,
  ContainerInput,
  ContainerTitle,
  Phrase,
  Title,
} from "./styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react";
import { validatePhone } from "../../utils/validatePhoneNumber.utils";
import { formatPhone } from "../../utils/formatPhone.util";
import Input from "../../components/input";
import { useLocalSearchParams } from "expo-router";
import ButtonRectangleBorder from "../../components/button-rectangle";
import ModalPhoneConfirmation from "../../components/modal-phone-confirmation";
import { useForgotPassword } from "../../context/forgot-password/forgot-password.context";

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

interface FormDataCode {
  code: string;
}
type Phone = {
  countryCode: "55";
  ddd: string;
  number: string;
}

type RouteParamsDto = {
  phone: string
}

export default function SignUpPhone() {
  const params = useLocalSearchParams<RouteParamsDto>();
  const { phoneSendCodeConfirmationForgotPasswordClient, setShowModalCodeConfirmation, phoneVerifyCodeConfirmationForgotPasswordClient, showModalCodeConfirmation, errorConfirmationCodeLocal, setErrorConfirmationCodeLocal, expirationTimeCodeConfirmationPhone, setExpirationTimeCodeConfirmationPhone, } = useForgotPassword();

  const [phoneLocal, setPhoneLocal] = useState('')
  const [phoneValue, setPhoneValue] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handlePhoneSendCodeConfirmationForgotPasswordClient = async (data: FormData) => {
    setPhoneValue(data.phone)
    await phoneSendCodeConfirmationForgotPasswordClient(data.phone)
  }

  const handleTextChange = (text: string) => {
    // Formata o texto enquanto o usuário digita
    const formattedText = formatPhone(text)
    setPhoneLocal(formattedText)
    const cleanValue = formattedText.replace(/\D/g, "");
    setValue('phone', cleanValue)
  };

  useEffect(() => {
    if (params.phone) {
      const { ddd, number } = JSON.parse(params.phone)
      const phoneValue = `${ddd}${number}`
      const formattedFormat = formatPhone(phoneValue)
      setPhoneLocal(formattedFormat)
      setValue('phone', phoneValue)
    }
  }, [])

  function handleModalPhoneConfirmationClose() {
    setShowModalCodeConfirmation(false)
  }

  const handleVerifyPhoneToRegister = async (data: FormDataCode) => {
    if (phoneValue === '') {
      setShowModalCodeConfirmation(false);
      setError('phone', { message: 'Digite um telefone valido' })
    } else {
      await phoneVerifyCodeConfirmationForgotPasswordClient({ code: data.code, phone: phoneValue })
    }
  }

  async function handleResendCodeConfirmationCreateClient() {
    await phoneSendCodeConfirmationForgotPasswordClient(phoneValue)
  }

  return (
    <Container>
      <ModalPhoneConfirmation
        onClosed={handleModalPhoneConfirmationClose}
        show={showModalCodeConfirmation}
        handleVerifyPhoneCode={handleVerifyPhoneToRegister}
        handleResendCode={handleResendCodeConfirmationCreateClient}
        errorConfirmationCodeLocal={errorConfirmationCodeLocal}
        setErrorConfirmationCodeLocal={setErrorConfirmationCodeLocal}
        expirationTimeCodeConfirmationPhone={expirationTimeCodeConfirmationPhone}
        setExpirationTimeCodeConfirmationPhone={setExpirationTimeCodeConfirmationPhone}
      />
      <ContainerHeader>
        <ContainerTitle>
          <Title>Esqueceu sua senha ?</Title>
          <Phrase>{`digite seu telefone! \n            vamos recupera-la`}</Phrase>
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
          <ContainerButton>
            <ButtonRectangleBorder
              title="Confirmar"
              onPress={handleSubmit(handlePhoneSendCodeConfirmationForgotPasswordClient)}
            />
          </ContainerButton>
        </ContainerForm>
      </ContainerBody>
      <ContainerFooter>
        {/* <ButtonBorder style={theme.shadow}>
          <ButtonBorderSecond style={theme.shadow}>
            <ButtonFirstStep
              onPress={handleSubmit(handleVerifyPhoneToRegister)}
              style={theme.shadow}
            >
              <TitleButton>Prosseguir</TitleButton>
            </ButtonFirstStep>
          </ButtonBorderSecond>
        </ButtonBorder> */}
      </ContainerFooter>
    </Container>
  );
}
