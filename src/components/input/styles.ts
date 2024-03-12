import styled, { css } from "styled-components/native";

interface ErrorProps {
  error?: string;
}

interface ContainerBorderProps extends ErrorProps {}
interface ContainerSecondBorderProps extends ErrorProps {}
interface InputComponentProps extends ErrorProps {}
interface ContainerInputProps extends ErrorProps {}

export const Container = styled.View`
  height: 100%;
  width: 100%;
`;
export const ContainerBorder = styled.View<ContainerBorderProps>`
  border-width: 5px;
  border-radius: 20px;
  border-color: ${(props) => props.theme.colors.transparent.blackGray};

  ${(props) => {
    return (
      !!props.error &&
      css`
        border-color: ${props.theme.colors.errors.whiteRed};
      `
    );
  }}
`;
export const ContainerSecondBorder = styled.View<ContainerSecondBorderProps>`
  border-width: 5px;
  border-color: ${(props) => props.theme.colors.backgroundColor};
  border-radius: 15px;

  ${(props) => {
    return (
      !!props.error &&
      css`
        border-color: ${props.theme.colors.errors.red};
      `
    );
  }}
`;
export const ContainerInput = styled.View<ContainerInputProps>`
  border-width: 5px;
  border-color: ${(props) => props.theme.colors.transparent.blackGray};
  border-radius: 10px;

  ${(props) =>
    !!props.error &&
    css`
      border-color: ${props.theme.colors.errors.darkRed};
    `}
`;
export const ContainerLabel = styled.View`
  height: 20px;

  padding-left: 15px;
`;

export const Label = styled.Text`
  color: ${(props) => props.theme.colors.errors.darkRed};
  text-align: left;
`;

export const InputComponent = styled.TextInput.attrs<InputComponentProps>(
  (props) => ({
    placeholderTextColor: props.error
      ? props.theme.colors.errors.darkRed
      : props.theme.colors.gray,
  })
)<InputComponentProps>`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.powderWhite};
  font-size: ${(props) => props.theme.fontSizes.medium};

  padding-left: 10px;

  ${(props) =>
    !!props.error &&
    css`
      border-color: ${props.theme.colors.errors.red};
      color: ${props.theme.colors.errors.red};
    `}
`;
