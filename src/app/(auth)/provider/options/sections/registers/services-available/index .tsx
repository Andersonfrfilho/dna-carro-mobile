import {
  Body,
  Container,
  ContainerConfirmButtonContainer,
  ContainerInputAmount,
  ContainerInputDescription,
  ContainerInputName,
  ContainerInputsService,
  ContainerSelectDuration,
  Header,
  Title,
} from "./styles";
import ButtonRectangleBorder from "../../../../../../../components/button-rectangle";
import { useProvider } from "../../../../../../../context/provider/provider.context";
import Loading from "../../../../../../../components/loading";
import Input from "../../../../../../../components/input";
import { ButtonSelectDuration, ModalSelectDuration } from "../../../../../../../components/modal-select-duration";
import { DurationValue } from "../../../../../../../constants/date";
import { useState } from "react";
import * as yup from "yup"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatAmount } from "../../../../../../../utils/formatAmount.util";
import { getOnlyNumberString } from "../../../../../../../utils/getOnlyNumberString";
import { CreateServiceParamsDto } from "../../../../../../../context/provider/provider.context.interface";

const schema = yup
  .object({
    name: yup.string().required("Um nome é necessário!").lowercase(),
    duration: yup.string().required("Selecione uma duração!").lowercase(),
    description: yup.string().required("Digite uma descrição valido!").lowercase(),
    amount: yup.string().required("Digite um valor valido!").lowercase(),
  })
  .required()

interface FormData {
  name: string;
  duration: number;
  description: string;
  amount: number;
}

export default function RegistersServiceAvailable() {
  const { createProviderService, isProviderLoading } = useProvider()

  const [modalSelectDurationVisible, setModalSelectDurationVisible] = useState(false)
  const [durationValue, setDurationValue] = useState<DurationValue>({} as DurationValue)

  const {
    control,
    formState: { errors },
    setFocus,
    setValue,
    getValues,
    clearErrors,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  })

  function handleOpenModalDuration() {
    setValue('duration', '')
    clearErrors('duration')
    setModalSelectDurationVisible(true)
  }

  async function handleSaveProviderService(serviceParams: FormData) {
    const amountValue = getValues('amount');
    const onlyNumbers = getOnlyNumberString(amountValue);
    const data: CreateServiceParamsDto = {
      active: true,
      amount: Number(onlyNumbers),
      name: serviceParams.name,
      duration: Number(serviceParams.duration),
      details: {
        description: serviceParams.description
      }
    }
    await createProviderService(data)
  }


  if (isProviderLoading) {
    return <Loading />
  }
  function handleCloseModalDuration() {
    setModalSelectDurationVisible(false)
  }

  function handleSelectDuration(item: DurationValue) {
    setValue('duration', item.value.toString())
    setDurationValue(item)
    setFocus('description')
  }

  const handleAmountChange = () => {
    const amountValue = getValues('amount');
    const onlyNumbers = getOnlyNumberString(amountValue);
    setValue('amount', formatAmount(Number(onlyNumbers) / 100))
  };
  console.log(!!durationValue.value)

  return (
    <Container>
      <ModalSelectDuration
        onClosed={handleCloseModalDuration}
        show={modalSelectDurationVisible}
        onSelect={handleSelectDuration}
      />
      <Header>
        <Title>Cadastre um serviço seus horários disponíveis</Title>
      </Header>
      <Body>
        <ContainerInputsService
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <ContainerInputName>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  reference={ref}
                  placeholder="Nome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.name?.message}
                  onSubmitEditing={() => handleOpenModalDuration()}
                />
              )}
              name="name"
            />
          </ContainerInputName>
          <ContainerSelectDuration>
            <ButtonSelectDuration
              error={errors?.duration?.message}
              select={!!durationValue.value}
              title={durationValue.label || "Selecione o tempo de duração"}
              onPress={handleOpenModalDuration}
            />
          </ContainerSelectDuration>
          <ContainerInputDescription>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  reference={ref}
                  multiline
                  maxLength={200}
                  placeholder="Descrição"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.description?.message}
                  onSubmitEditing={() => handleOpenModalDuration()}
                />
              )}
              name="description"
            />
          </ContainerInputDescription>
          <ContainerInputAmount>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  reference={ref}
                  keyboardType="numeric"
                  placeholder="Valor: "
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onEndEditing={handleAmountChange}
                  value={value}
                  error={errors?.amount?.message}
                />
              )}
              name="amount"
            />
          </ContainerInputAmount>
        </ContainerInputsService>
      </Body>
      <ContainerConfirmButtonContainer>
        <ButtonRectangleBorder
          title="Salvar"
          onPress={handleSubmit(handleSaveProviderService)}
        />
      </ContainerConfirmButtonContainer>
    </Container >
  );
}
