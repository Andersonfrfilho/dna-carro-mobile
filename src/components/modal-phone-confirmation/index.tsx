import {
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
  ContainerModal,
  ContainerSecondBorder,
  ContainerTitle,
  ContainerToolbar,
  IconClosed,
  InputTextComponent,
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
import { INDEXES } from "./constant";


const schema = yup
  .object({
    code: yup.string().length(1).required("Código invalido telefone é necessário!"),
  })
  .required()

interface FormData {
  code: string;
}

interface ParamsDto {
  onClosed: () => {}
}
export default function ModalPhoneConfirmation({
  onClosed
}: ParamsDto) {
  const theme = useTheme();
  const { verifyPhoneToRegister } = useSignUp();
  const [codeText, setCodeText] = useState('');
  const [codeFirst, setCodeFirst] = useState('');
  const [codeSecond, setCodeSecond] = useState('');
  const [codeThird, setCodeThird] = useState('');
  const [codeFour, setCodeFour] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleVerifyPhoneToRegister = async (data: FormData) => {
    await verifyPhoneToRegister(data.phone)
  }

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
  }, [codeText])


  return (
    <ContainerModal visible={true}>
      <Container>
        <ContainerHeader>
          <ContainerToolbar>
            <ContainerIconClosed onPress={onClosed}>
              <IconClosed name={"close-thick"} />
            </ContainerIconClosed>
          </ContainerToolbar>
          <ContainerTitle>
            <Title>Confirmação de telefone</Title>
            <Phrase>{`Confirme o telefone, \n     digite o código \n             00:00`}</Phrase>
          </ContainerTitle>
        </ContainerHeader>
        <ContainerBody>
          <ContainerForm>
            <ContainerInputView>
              <ContainerBorder style={theme.shadow} error={''}>
                <ContainerSecondBorder error={''}>
                  <ContainerInput style={theme.shadow} error={''}>
                    <TitleCode>{codeFirst}</TitleCode>
                  </ContainerInput>
                </ContainerSecondBorder>
              </ContainerBorder>
            </ContainerInputView>
            <ContainerInputView>
              <ContainerBorder style={theme.shadow} error={''}>
                <ContainerSecondBorder error={''}>
                  <ContainerInput style={theme.shadow} error={''}>
                    <TitleCode>{codeSecond}</TitleCode>
                  </ContainerInput>
                </ContainerSecondBorder>
              </ContainerBorder>
            </ContainerInputView>
            <ContainerInputView>
              <ContainerBorder style={theme.shadow} error={''}>
                <ContainerSecondBorder error={''}>
                  <ContainerInput style={theme.shadow} error={''}>
                    <TitleCode>{codeThird}</TitleCode>
                  </ContainerInput>
                </ContainerSecondBorder>
              </ContainerBorder>
            </ContainerInputView>
            <ContainerInputView>
              <ContainerBorder style={theme.shadow} error={''}>
                <ContainerSecondBorder style={theme.shadow} error={''}>
                  <ContainerInput style={theme.shadow} error={''}>
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
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <InputTextComponent
                  ref={ref}
                  onBlur={onBlur}
                  onChangeText={setCodeText}
                  value={value}
                  error={errors?.code?.message}
                  maxLength={4}
                  keyboardType="number-pad"
                  caretHidden={true}
                />
              )}
              name="code"
            />

          </ContainerForm>
          <ContainerTitle>
            <Phrase>
              Reenviar
            </Phrase>
          </ContainerTitle>
        </ContainerBody>
        <ContainerFooter>
          <ContainerButton>
            <ButtonRectangleBorder
              title="Confirmar"
              onPress={() => {
                console.log("oloco")
              }}
            />
          </ContainerButton>
        </ContainerFooter>
      </Container>
    </ContainerModal>
  );
}
