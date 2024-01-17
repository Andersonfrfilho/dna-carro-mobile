import {
  Container,
  ContainerBody,
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
import { useEffect } from "react";
import InputPassword from "../../../components/inputPassword";
import { useLocalSearchParams } from "expo-router";
import ButtonCircleBorder from "../../../components/button-circle";
import { useForgotPassword } from "../../../context/forgot-password/forgot-password.context";

const schema = yup
  .object({
    password: yup.string().min(6).required("Um password é necessário!"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Senha precisa ser idêntica').required("Preencha a confirmação de senha"),
  })
  .required()


interface FormData {
  password: string;
  confirmPassword: string;
}
type PropsRouteParams = {
  phone: string;
  code: string;
}
export default function ResetPasswordAccount() {
  const params = useLocalSearchParams<PropsRouteParams>();
  const { resetPassword } = useForgotPassword();

  useEffect(() => {
    setFocus('password')
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleResetPassword = async (data: FormData) => {
    await resetPassword({
      phone: params.phone,
      password: data.password,
      code: params.code
    })
  }


  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Resete de senha</Title>
          <Phrase>{`Vamos la, \n     digite uma nova senha!`}</Phrase>
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
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <InputPassword
                  placeholder="Senha"
                  referenceInput={ref}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.password?.message}
                  onSubmitEditing={() => setFocus('confirmPassword')}
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
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <InputPassword
                  placeholder="Senha"
                  referenceInput={ref}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.confirmPassword?.message}
                />
              )}
              name="confirmPassword"
            />
          </ContainerInput>
          <ContainerFooter>
            <ButtonCircleBorder
              title={"Prosseguir"}
              onPress={handleSubmit(handleResetPassword)}
            />
          </ContainerFooter>
        </ContainerForm>
      </ContainerBody>
    </Container >
  );
}
