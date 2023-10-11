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
import { DOCUMENT_TYPES, GENDER_ITEMS_TYPE } from "../../../constants/account";
import ButtonRectangleBorder from "../../../components/button-rectangle";
import SearchItems, { DataListProps } from "../../../components/searchItems";
import InputDateButton from "../../../components/inputDateButton";
import { DATE_TYPE_MODE_PICKER } from "../../../constants/date";
import { formatDateInDDMMYYYYString } from "../../../utils/formatDate.util";

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
    gender: yup.string(),
    dateBirth: yup.string(),
    password: yup.string().min(6).required("Um password é necessário!"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Senha precisa ser idêntica').required("Preencha a confirmação de senha"),
  })
  .required()

interface FormData {
  email: string
}

type iconName = 'checkbox-blank-outline' | 'checkbox-outline'

export default function SignUp() {
  const { isSignUpLoading } = useSignUp();
  const [buttonDisable, setButtonDisable] = useState(false)

  const [cpfIconName, setCpfIconName] = useState<iconName>("checkbox-blank-outline")
  const [cpfDocumentSelect, setCpfDocumentSelect] = useState<boolean>(false)
  const [cpfDocumentDisable, setCpfDocumentDisable] = useState<boolean>(false)

  const [cnpjIconName, setCnpjIconName] = useState<iconName>("checkbox-blank-outline")
  const [cnpjDocumentSelect, setCnpjDocumentSelect] = useState<boolean>(false)
  const [cnpjDocumentDisable, setCnpjDocumentDisable] = useState<boolean>(false)


  const [isVisibleModalGender, setIsVisibleModalGender] = useState<boolean>(false)

  const [datePicker, setDatePicker] = useState<Date>(new Date());

  const [selectItemGender, setSelectItemGender] = useState<DataListProps>({ id: '', value: '', label: 'selecione o gênero' } as any)

  useEffect(() => {
    setFocus('name')
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleAccountPreparedToRegister = async (data: FormData) => {
    console.log(data)
  }

  useEffect(() => {
    const errorContent = Object.keys(errors).length === 0 && errors.constructor === Object

    setButtonDisable(isSignUpLoading || !errorContent)
  }, [isSignUpLoading, errors])

  const formatCPF = (text) => {
    // Remove todos os caracteres não numéricos
    const cleanedText = text.replace(/\D/g, "");

    // Aplica a máscara de CPF (XXX.XXX.XXX-XX)
    const formattedText =
      cleanedText.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return formattedText;
  };

  const formatCNPJ = (text) => {
    // Remove todos os caracteres não numéricos
    const cleanedText = text.replace(/\D/g, "");

    // Aplica a máscara de CNPJ (XX.XXX.XXX/XXXX-XX)
    const formattedText = cleanedText.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );

    return formattedText;
  };
  const handleTextChange = (text) => {
    // Formata o texto enquanto o usuário digita
    const formattedText = cpfDocumentSelect ? formatCPF(text) : formatCNPJ(text);
    setValue('document', formattedText)
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
    setDatePicker(param)
    const dateFormat = formatDateInDDMMYYYYString(param)
    setValue('dateBirth', dateFormat)
  }


  return (
    <Container>
      <SearchItems title="Selecione o gênero" data={GENDER_ITEMS_TYPE} onSelectItem={setSelectItemGender} onChangeVisible={setIsVisibleModalGender} visible={isVisibleModalGender} />
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
                  onSubmitEditing={() => setFocus("document")}
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
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <InputCheck
                  placeholder="Documento"
                  onBlur={onBlur}
                  onChangeText={handleTextChange}
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
          <ContainerButtonGender>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <ButtonRectangleBorder title={selectItemGender.label} onPress={() => setIsVisibleModalGender(true)} disabled={false} />
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
                  onChangeText={onChange}
                  datePickerValue={datePicker}
                  onChangeDatePicker={handleDatePickerSelectDate}
                  value={value}
                  mode={DATE_TYPE_MODE_PICKER.DATE}
                  error={errors?.email?.message}
                  keyboardType="number-pad"
                />
              )}
              name="dateBirth"
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
