import {
  ButtonPhrase,
  Container,
  ContainerBody,
  ContainerBorder,
  ContainerButton,
  ContainerFooter,
  ContainerForm,
  ContainerHeader,
  ContainerIconClosed,
  ContainerInput,
  ContainerInputView,
  ContainerLabel,
  ContainerModal,
  ContainerSecondBorder,
  ContainerTitle,
  ContainerToolbar,
  IconClosed,
  InputTextComponent,
  Label,
  Phrase,
  Title,
  TitleCode,
} from "./styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useTheme } from "styled-components/native";
import { useEffect, useState } from "react";
import { useSignUp } from "../../context/signup.context";
import ButtonRectangleBorder from "../button-rectangle";
import { INDEXES, INITIAL_TIME_EXPIRATION, LENGTH_CODE, ONE_MINUTE, ONE_SECOND, RESET_SECOND, ZERO_MINUTES, ZERO_SECONDS } from "./constant";
import { formatMinutesSeconds } from "../../utils/formatMinutesSeconds.utils";

const CODE_LENGTH = 4;

const schema = yup
  .object({
    code: yup.string().length(CODE_LENGTH, "Código invalido!").required("Código invalido!"),
  })
  .required()

interface FormData {
  code: string;
}

interface ParamsDto {
  readonly onClosed: () => void;
  readonly show: boolean;
  readonly phone: string;
}
export default function ModalPhoneConfirmation({
  onClosed, show, phone
}: ParamsDto) {
  const theme = useTheme();
  const { errorConfirmationCodeLocal, setErrorConfirmationCodeLocal, phoneVerifyCodeConfirmationCreateClient, expirationTimeCodeConfirmationPhone, setExpirationTimeCodeConfirmationPhone } = useSignUp();
  const [codeText, setCodeText] = useState('');
  const [codeFirst, setCodeFirst] = useState('');
  const [codeSecond, setCodeSecond] = useState('');
  const [codeThird, setCodeThird] = useState('');
  const [codeFour, setCodeFour] = useState('');
  const [time, setTime] = useState("")


  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
    setError
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleVerifyPhoneToRegister = async (data: FormData) => {
    const { ddd, number, countryCode } = JSON.parse(phone)
    const phoneValue = `${countryCode}${ddd}${number}`
    await phoneVerifyCodeConfirmationCreateClient({ code: data.code, phone: phoneValue })
  }
  useEffect(() => {
    setFocus('code')
    setValue('code', '')
    setCodeFirst('')
    setCodeSecond('')
    setCodeThird('')
    setCodeFour('')
    setCodeText('')
  }, [])

  useEffect(() => {
    if (errorConfirmationCodeLocal !== '') {
      setError('code', { message: errorConfirmationCodeLocal })
    }
  }, [errorConfirmationCodeLocal])

  useEffect(() => {
    if (expirationTimeCodeConfirmationPhone !== INITIAL_TIME_EXPIRATION) {
      setTime(expirationTimeCodeConfirmationPhone)
    }
  }, [expirationTimeCodeConfirmationPhone])

  useEffect(() => {
    const [minutes, seconds] = time.split(":");
    let minutesNumber = Number(minutes);
    let secondsNumber = Number(seconds);

    if (minutesNumber > ZERO_MINUTES || secondsNumber > ZERO_SECONDS) {
      if (secondsNumber === ZERO_SECONDS && minutesNumber >= ONE_MINUTE) {
        minutesNumber -= ONE_MINUTE
        secondsNumber = RESET_SECOND
      } else {
        secondsNumber -= ONE_SECOND
      }
      const formatMinutesAndSeconds = formatMinutesSeconds({
        minutes: minutesNumber,
        seconds: secondsNumber,
      });

      const idSetTimeout = setTimeout(() => {
        setTime(formatMinutesAndSeconds);
      }, 1000);

      return () => {
        clearTimeout(idSetTimeout);
      }
    } else {
      setExpirationTimeCodeConfirmationPhone(INITIAL_TIME_EXPIRATION)
    }
  }, [time]);

  useEffect(() => {
    if (codeText.length === INDEXES.FIRST) {
      setCodeFirst("|")
    } else {
      setCodeFirst(codeText[INDEXES.FIRST])
    }
    if (codeText.length === INDEXES.SECOND) {
      setCodeSecond("|")
    } else {
      setCodeSecond(codeText[INDEXES.SECOND])
    }
    if (codeText.length === INDEXES.THIRD) {
      setCodeThird("|")
    } else {
      setCodeThird(codeText[INDEXES.THIRD])
    }
    if (codeText.length === INDEXES.FOUR) {
      setCodeFour("|")
    } else {
      setCodeFour(codeText[INDEXES.FOUR])
    }

    if (codeText.length === LENGTH_CODE) {
      setValue('code', codeText)
    }
  }, [codeText])

  return (
    <ContainerModal visible={show}>
      <Container>
        <ContainerHeader>
          <ContainerToolbar>
            <ContainerIconClosed onPress={onClosed}>
              <IconClosed name={"close-thick"} />
            </ContainerIconClosed>
          </ContainerToolbar>
          <ContainerTitle>
            <Title>Confirmação de telefone</Title>
            <Phrase>{`Confirme o telefone, \n     digite o código \n             ${time}`}</Phrase>
          </ContainerTitle>
        </ContainerHeader>
        <ContainerBody>
          <ContainerLabel>
            {!!errors?.code?.message && <Label>{errors.code.message}</Label>}
          </ContainerLabel>
          <ContainerForm>
            <ContainerInputView>
              <ContainerBorder style={theme.shadow} error={errors?.code?.message}>
                <ContainerSecondBorder error={errors?.code?.message}>
                  <ContainerInput style={theme.shadow} error={errors?.code?.message}>
                    <TitleCode>{codeFirst}</TitleCode>
                  </ContainerInput>
                </ContainerSecondBorder>
              </ContainerBorder>
            </ContainerInputView>
            <ContainerInputView>
              <ContainerBorder style={theme.shadow} error={errors?.code?.message}>
                <ContainerSecondBorder error={errors?.code?.message}>
                  <ContainerInput style={theme.shadow} error={errors?.code?.message}>
                    <TitleCode>{codeSecond}</TitleCode>
                  </ContainerInput>
                </ContainerSecondBorder>
              </ContainerBorder>
            </ContainerInputView>
            <ContainerInputView>
              <ContainerBorder style={theme.shadow} error={errors?.code?.message}>
                <ContainerSecondBorder error={errors?.code?.message}>
                  <ContainerInput style={theme.shadow} error={errors?.code?.message}>
                    <TitleCode>{codeThird}</TitleCode>
                  </ContainerInput>
                </ContainerSecondBorder>
              </ContainerBorder>
            </ContainerInputView>
            <ContainerInputView>
              <ContainerBorder style={theme.shadow} error={errors?.code?.message}>
                <ContainerSecondBorder style={theme.shadow} error={errors?.code?.message}>
                  <ContainerInput style={theme.shadow} error={errors?.code?.message}>
                    <TitleCode>{codeFour}</TitleCode>
                  </ContainerInput>
                </ContainerSecondBorder>
              </ContainerBorder>
            </ContainerInputView>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onBlur, ref } }) => (
                <InputTextComponent
                  ref={ref}
                  onBlur={onBlur}
                  onChangeText={setCodeText}
                  value={codeText}
                  error={errors?.code?.message}
                  maxLength={LENGTH_CODE}
                  keyboardType="number-pad"
                  caretHidden={true}
                />
              )}
              name="code"
            />

          </ContainerForm>
          <ContainerTitle>
            {expirationTimeCodeConfirmationPhone === INITIAL_TIME_EXPIRATION && (<ButtonPhrase>
              <Phrase>
                Reenviar
              </Phrase>
            </ButtonPhrase>
            )}

          </ContainerTitle>
        </ContainerBody>
        <ContainerFooter>
          <ContainerButton>
            <ButtonRectangleBorder
              title="Confirmar"
              onPress={handleSubmit(handleVerifyPhoneToRegister)}
            />
          </ContainerButton>
        </ContainerFooter>
      </Container>
    </ContainerModal>
  );
}
