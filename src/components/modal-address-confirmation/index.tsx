import {
  Container,
  ContainerBody,
  ContainerButton,
  ContainerButtonClosed,
  ContainerForm,
  ContainerHeader,
  ContainerInput,
  ContainerModal,
  ContainerTitle,
  IconClosed,
  Phrase,
} from "./styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useTheme } from "styled-components/native";
import { useEffect } from "react";
import ButtonRectangleBorder from "../button-rectangle";
import Input from "../input";

const schema = yup
  .object({
    street: yup.string().required("Rua é obrigatório!"),
    number: yup.string().required("Número é obrigatório!"),
    neighborhood: yup.string().required("Bairro é obrigatório!"),
    state: yup.string().required("Estado é obrigatório!"),
    postalCode: yup.string().required("CEP é obrigatório!"),
    city: yup.string().required("Cidade é obrigatório!"),
    country: yup.string().required("País é obrigatório!"),
    latitude: yup.string(),
    longitude: yup.string(),
    details: yup.object(),
  })
  .required()

export interface FormDataParamsDto {
  street: string;
  number: string;
  neighborhood: string;
  state: string;
  postalCode: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  details: any;
}

interface ParamsDto {
  readonly onClosed: () => void;
  readonly show: boolean;
  readonly components: FormDataParamsDto;
  readonly handleAccountAddressPreparedToRegister: (data: FormDataParamsDto) => Promise<void>;
}
export default function ModalAddressConfirmation({
  onClosed, show, components, handleAccountAddressPreparedToRegister
}: ParamsDto) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const { street = "", number = "", neighborhood = "", city = "", state = "", country = "", postalCode = "", details = "", latitude = "", longitude = "" } = components;
    setValue('street', street)
    setValue('number', number)
    setValue('neighborhood', neighborhood)
    setValue('city', city)
    setValue('state', state)
    setValue('country', country)
    setValue('postalCode', postalCode)
    setValue('details', details)
    setValue('latitude', latitude)
    setValue('longitude', longitude)

    if (street === "") {
      setFocus('street')
    }
    if (number === "") {
      setFocus('number')
    }
    if (neighborhood === "") {
      setFocus('neighborhood')
    }
    if (postalCode === "") {
      setFocus('postalCode')
    }
    if (city === "") {
      setFocus('city')
    }
    if (state === "") {
      setFocus('state')
    }

  }, [show, components])

  return (
    <ContainerModal visible={show} transparent>
      <Container>
        <ContainerHeader>
          <ContainerTitle>
            <Phrase>Confirme os dados do endereço</Phrase>
          </ContainerTitle>
          <ContainerButtonClosed onPress={onClosed}>
            <IconClosed
              name={"close-thick"}
            />
          </ContainerButtonClosed>
        </ContainerHeader>
        <ContainerBody>
          <ContainerForm>
            <ContainerInput>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onBlur, ref, value, onChange } }) => (
                  <Input
                    reference={ref}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors?.street?.message}
                    placeholder="Rua"
                  />
                )}
                name="street"
              />
            </ContainerInput>
            <ContainerInput>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onBlur, ref, value, onChange } }) => (
                  <Input
                    reference={ref}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors?.number?.message}
                    placeholder="Número"
                    keyboardType="numeric"
                  />
                )}
                name="number"
              />
            </ContainerInput>
            <ContainerInput>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onBlur, ref, value, onChange } }) => (
                  <Input
                    reference={ref}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors?.neighborhood?.message}
                    placeholder="Bairro"
                  />
                )}
                name="neighborhood"
              />
            </ContainerInput>
            <ContainerInput>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onBlur, ref, value, onChange } }) => (
                  <Input
                    reference={ref}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors?.postalCode?.message}
                    placeholder="CEP"
                  />
                )}
                name="postalCode"
              />
            </ContainerInput>
            <ContainerInput>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onBlur, ref, value, onChange } }) => (
                  <Input
                    reference={ref}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors?.city?.message}
                    placeholder="Cidade"
                  />
                )}
                name="city"
              />
            </ContainerInput>
            <ContainerInput>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onBlur, ref, value, onChange } }) => (
                  <Input
                    reference={ref}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors?.state?.message}
                    placeholder="Estado"
                  />
                )}
                name="state"
              />
            </ContainerInput>
            <ContainerButton>
              <ButtonRectangleBorder
                title="Confirmar"
                onPress={handleSubmit(handleAccountAddressPreparedToRegister)}
              />
            </ContainerButton>
          </ContainerForm>
        </ContainerBody>
      </Container>
    </ContainerModal>
  );
}
