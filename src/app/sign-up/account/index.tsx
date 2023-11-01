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
} from "./styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from "../../../components/input";
import { useSignUp } from "../../../context/signup.context";
import InputCheck from "../../../components/inputCheck";
import ButtonCircleBorder from "../../../components/button-circle";
import { useEffect, useState } from "react";
import { validateCPF } from "../../../utils/validateCpf.util";
import { validateCNPJ } from "../../../utils/validateCnpj.util";
import InputPassword from "../../../components/inputPassword";
import { DOCUMENT_TYPES, GENDER_ITEMS_TYPE, GENDER_TYPES } from "../../../constants/account";
import ButtonRectangleBorder from "../../../components/button-rectangle";
import SearchItems, { DataListProps } from "../../../components/searchItems";
import InputDateButton from "../../../components/inputDateButton";
import { DATE_TYPE_MODE_PICKER } from "../../../constants/date";
import { formatDateInDDMMYYYYString } from "../../../utils/formatDate.util";
import { formatCPF } from "../../../utils/formatCpf.util";
import { formatCNPJ } from "../../../utils/formatCnpj.util";
import { useLocalSearchParams } from "expo-router";
import { validateDateFormatBR } from "../../../utils/validDateFormat.util";
import { validateMajority } from "../../../utils/validateMajority.util";
import { formatBirthDate } from "../../../utils/formatDateBirth.util";

const schema = yup
  .object({
    name: yup.string().required("Um nome é necessário!"),
    lastName: yup.string().required("Um sobrenome é necessário!"),
    email: yup.string().email("Digite um email valido!").required("Um email é necessário!"),
    document: yup.string().test("cpf-cnpj-validation", "documento inválido", (value) => {
      // Remove caracteres não numéricos
      const cleanValue = value.replace(/\D/g, "");
      // Verifica se é um CPF ou CNPJ válido
      return cleanValue.length === 11 ? validateCPF(cleanValue) : validateCNPJ(cleanValue);
    }),
    documentType: yup.string().oneOf(Object.values(DOCUMENT_TYPES), "Tipo de documento invalido").required("Selecione um tipo de documento!"),
    gender: yup.string().oneOf(Object.values(GENDER_TYPES), "Tipo de gênero invalido").required("Selecione um tipo de gênero!"),
    birthDate: yup.string().required("Selecione ou digite uma data valida!"),
    password: yup.string().min(6).required("Um password é necessário!"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Senha precisa ser idêntica').required("Preencha a confirmação de senha"),
  })
  .required()

interface FormData {
  name: string;
  lastName: string;
  email: string;
  document: string;
  documentType: string;
  gender: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

type iconName = 'checkbox-blank-outline' | 'checkbox-outline'

type PropsRouteParams = {
  phone: string;
}

export default function SignUpAccount() {
  const params = useLocalSearchParams<PropsRouteParams>();
  const { isSignUpLoading, createUserInfoCacheAccount } = useSignUp();
  const [buttonDisable, setButtonDisable] = useState(false)

  const [cpfIconName, setCpfIconName] = useState<iconName>("checkbox-blank-outline")
  const [cpfDocumentSelect, setCpfDocumentSelect] = useState<boolean>(false)
  const [cpfDocumentDisable, setCpfDocumentDisable] = useState<boolean>(false)

  const [cnpjIconName, setCnpjIconName] = useState<iconName>("checkbox-blank-outline")
  const [cnpjDocumentSelect, setCnpjDocumentSelect] = useState<boolean>(false)
  const [cnpjDocumentDisable, setCnpjDocumentDisable] = useState<boolean>(false)


  const [isVisibleModalGender, setIsVisibleModalGender] = useState<boolean>(false)

  const [datePicker, setDatePicker] = useState<Date>(new Date());
  const [birthDate, setBirthDate] = useState("")
  const [selectItemGender, setSelectItemGender] = useState<DataListProps>({ id: '', value: '', label: 'selecione o gênero' } as any)

  useEffect(() => {
    setFocus('name')
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
  const handleAccountPreparedToRegister = async (data: FormData) => {

    await createUserInfoCacheAccount({
      user: data,
      phone: params.phone
    })
  }

  useEffect(() => {
    const errorContent = Object.keys(errors).length === 0 && errors.constructor === Object

    setButtonDisable(isSignUpLoading || !errorContent)
  }, [isSignUpLoading, errors])

  const handleDocumentChange = (text: string) => {
    const formattedText = cpfDocumentSelect ? formatCPF(text) : formatCNPJ(text);
    setValue('document', formattedText)
  };

  const handleBirthDateChange = (text: string) => {
    const formattedText = formatBirthDate(text);

    const isValideDate = validateDateFormatBR(formattedText)
    if (!isValideDate) {
      setError('birthDate', {
        message: 'Data de nascimento invalida'
      })
    }

    const isMajorAge = validateMajority(formattedText)

    if (!isMajorAge) {
      setError('birthDate', {
        message: 'Voce pode se cadastrar tendo 18 anos de idade'
      })
    }

    setValue('birthDate', formattedText)
    clearErrors('birthDate')
    setBirthDate(formattedText)
  };

  const handleSelectDocumentTypeCpf = () => {
    setCpfIconName('checkbox-outline')
    setCpfDocumentSelect(true)
    setCpfDocumentDisable(true)
    setCnpjIconName('checkbox-blank-outline')
    setCnpjDocumentSelect(false)
    setCnpjDocumentDisable(false)
    setValue('document', '')
    setFocus('document')
    setValue('documentType', DOCUMENT_TYPES.CPF)
  }

  const handleSelectDocumentTypeCnpj = () => {
    setCnpjIconName('checkbox-outline')
    setCnpjDocumentSelect(true)
    setCnpjDocumentDisable(true)
    setCpfIconName('checkbox-blank-outline')
    setCpfDocumentSelect(false)
    setCpfDocumentDisable(false)
    setValue('document', '')
    setFocus('document')
    setValue('documentType', DOCUMENT_TYPES.CNPJ)
  }

  const handleDatePickerSelectDate = (param: Date) => {
    const dateFormat = formatDateInDDMMYYYYString(param)
    setDatePicker(param)
    setValue('birthDate', dateFormat)
    setBirthDate(dateFormat)
  }

  const handleSelectItemGender = (param: DataListProps) => {
    setSelectItemGender(param);
    setValue('gender', param.value)
    clearErrors('gender')
    setFocus('password')
  }

  return (
    <Container>
      <SearchItems title="Selecione o gênero" data={GENDER_ITEMS_TYPE} onSelectItem={handleSelectItemGender} onChangeVisible={setIsVisibleModalGender} visible={isVisibleModalGender} />
      <ContainerHeader>
        <ContainerTitle>
          <Title>Vamos começar</Title>
          <Phrase>{`Preencha seus dados, \n     Pessoais!`}</Phrase>
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
                  placeholder="Nome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.name?.message}
                  onSubmitEditing={() => setFocus('lastName')}
                />
              )}
              name="name"
            />
          </ContainerInput>
          <ContainerInput>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  placeholder="Sobrenome"
                  reference={ref}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.lastName?.message}
                  onSubmitEditing={() => setFocus("email")}
                />
              )}
              name="lastName"
            />
          </ContainerInput>
          <ContainerInput>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  placeholder="Em@il"
                  reference={ref}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.email?.message}
                  onSubmitEditing={() => setFocus("document")}
                />
              )}
              name="email"
            />
          </ContainerInput>
          <ContainerInput>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onBlur, value, ref } }) => (
                <InputCheck
                  placeholder="Documento"
                  onBlur={onBlur}
                  onChangeText={handleDocumentChange}
                  value={value}
                  error={errors?.document?.message}
                  onSubmitEditing={() => setFocus('password')}
                  referenceInput={ref}
                  leftIconButtonDisabled={cpfDocumentDisable}
                  leftIconButtonOnPress={handleSelectDocumentTypeCpf}
                  leftIconButtonSelect={cpfDocumentSelect}
                  leftIconName={cpfIconName}
                  leftIconTitle="CPF"
                  rightIconButtonDisabled={cnpjDocumentDisable}
                  rightIconButtonOnPress={handleSelectDocumentTypeCnpj}
                  rightIconButtonSelect={cnpjDocumentSelect}
                  rightIconName={cnpjIconName}
                  rightIconTitle="CNPJ"
                  inputEditable={true}
                  maxLength={cpfDocumentSelect ? 14 : 18}
                  keyboardType={"numeric"}
                />
              )}
              name="document"
            />
          </ContainerInput>
          <ContainerButtonGender error={errors?.gender?.message}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={() => (
                <ButtonRectangleBorder error={errors?.gender?.message} title={selectItemGender.label} onPress={() => setIsVisibleModalGender(true)} disabled={false} />
              )}

              name="gender"
            />
          </ContainerButtonGender>
          <ContainerInput>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <InputDateButton
                  placeholder="Data Nascimento"
                  onBlur={onBlur}
                  onChangeText={handleBirthDateChange}
                  datePickerValue={datePicker}
                  onChangeDatePicker={handleDatePickerSelectDate}
                  value={birthDate}
                  mode={DATE_TYPE_MODE_PICKER.DATE}
                  error={errors?.birthDate?.message}
                  keyboardType="number-pad"
                />
              )}
              name="birthDate"
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
              onPress={handleSubmit(handleAccountPreparedToRegister)}
              disabled={buttonDisable}
            />
          </ContainerFooter>
        </ContainerForm>
      </ContainerBody>
    </Container >
  );
}
