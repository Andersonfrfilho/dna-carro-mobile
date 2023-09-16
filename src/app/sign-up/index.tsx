import {
  Container,
  ContainerBody,
  ContainerForm,
  ContainerHeader,
  ContainerInput,
  ContainerTitle,
  Phrase,
  Title,
} from "./styles";
import Input from "../../components/input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button, Text, TextInput, View } from "react-native";

const schema = yup
  .object({
    email: yup.string().email("Digite um email valido!").required("Um email é necessário!"),
  })
  .required()

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => console.log(data)

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
            <Input
              placeholder="em@il"
            />
          </ContainerInput>
        </ContainerForm>
      </ContainerBody>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && <Text>This is required.</Text>}
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </Container>
  );
}
