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
  ContainerButtonGender,
  ContainerLoading,
} from "./styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from "../../../components/input";
import { useSignUp } from "../../../context/signup.context";
import { useEffect } from "react";

import { useLocalSearchParams } from "expo-router";

import Loading from "../../../components/loading";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

const schema = yup
  .object({
    addresses: yup.string().required("Um endereço é necessário!"),
  })
  .required()

type PropsRouteParams = {
  phone: string;
}

export default function SignUpAccount() {
  const params = useLocalSearchParams<PropsRouteParams>();
  const { isSignUpLoading, createUserInfoCacheAccount, getLastTerm, loadingSignUp } = useSignUp();

  useEffect(() => {
    setFocus('addresses')
  }, [])

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

  const handleAddressPreparedToRegister = async (data: FormData) => {
    await createUserInfoCacheAddress({
      user: data,
      phone: params.phone,
      term: data.term
    })
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
          <Title>Digite seu endereço</Title>
          <Phrase>{`Preencha seu endereço, \n     Selecione um local!`}</Phrase>
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
                <Input
                  reference={ref}
                  placeholder="Endereço"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.addresses?.message}
                />
              )}
              name="addresses"
            />
          </ContainerInput>
        </ContainerForm>
        <View style={styles.container}>
          <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }} />
        </View>
      </ContainerBody>
    </Container >
  );
}
