import styled, { css } from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultTheme } from "styled-components";
interface ErrorProps {
  error?: string;
}
interface SelectProps {
  select: boolean;
}
interface ContainerBorderProps extends ErrorProps {}
interface ContainerSecondBorderProps extends ErrorProps {}
interface InputComponentProps extends ErrorProps {}
interface ContainerInputProps extends ErrorProps {}
interface ButtonIconProps extends SelectProps {}
interface IconProps extends SelectProps, ErrorProps {}
interface TitleIconProps extends SelectProps, ErrorProps {}

const getColorIconSelect = ({
  select,
  error,
  theme,
}: IconProps & { theme: DefaultTheme }) => {
  if (error) {
    return theme.colors.errors.darkRed;
  }
  if (select) {
    return theme.colors.powderWhite;
  }

  return theme.colors.gray;
};

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
  flex-direction: row;

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
export const ContainerLabel = styled.View`
  height: 20px;

  padding-left: 15px;
`;

export const ContainerButtonIcon = styled.View<ContainerInputProps>`
  flex: 1;
  border-width: 5px;
  border-color: ${(props) => props.theme.colors.transparent.blackGray};
  border-radius: 10px;

  margin-left: 1.5px;
  margin-right: 1.5px;
  ${(props) =>
    !!props.error &&
    css`
      border-color: ${props.theme.colors.errors.darkRed};
    `}
`;

export const ButtonIcon = styled.TouchableHighlight<ButtonIconProps>`
  flex: 1;

  background-color: ${(props) => props.theme.colors.powderWhite};

  justify-content: center;
  align-items: center;

  ${(props) =>
    !!props.select &&
    css`
      background-color: ${(props) => props.theme.colors.whiteGreenColor};
    `}
`;

export const ContainerIconTitle = styled.View`
  flex: 1;
`;
export const ContainerIcon = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;
export const ContainerTitle = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const IconTitle = styled.Text<TitleIconProps>`
  color: ${(props) => props.theme.colors.gray};
  text-align: left;

  ${(props) =>
    !!props.select &&
    css`
      color: ${(props) => props.theme.colors.powderWhite};
    `}

  ${(props) =>
    !!props.error &&
    css`
      color: ${(props) => props.theme.colors.errors.darkRed};
    `}
`;

export const Icon = styled(MaterialCommunityIcons).attrs<IconProps>(
  (props) => ({
    size: props.theme.icon.size.median,
    color: getColorIconSelect({
      select: props.select,
      error: props.error,
      theme: props.theme,
    }),
  })
)<IconProps>``;

export const ContainerInput = styled.View<ContainerInputProps>`
  flex: 3;
  border-width: 5px;
  border-color: ${(props) => props.theme.colors.transparent.blackGray};
  border-radius: 10px;
  margin-left: 1.5px;
  ${(props) =>
    !!props.error &&
    css`
      border-color: ${props.theme.colors.errors.darkRed};
    `}
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
