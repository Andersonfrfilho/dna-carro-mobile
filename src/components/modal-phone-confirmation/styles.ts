import styled, { css } from "styled-components/native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ErrorProps {
  error?: string;
}

interface ContainerBorderProps extends ErrorProps {}
interface ContainerSecondBorderProps extends ErrorProps {}
interface ContainerInputProps extends ErrorProps {}
interface InputComponentProps extends ErrorProps {}

export const ContainerModal = styled.Modal`
  flex: 1;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

export const ContainerToolbar = styled.View`
  flex-direction: row;

  justify-content: flex-end;

  height: 60px;
`;

export const ContainerIconClosed = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 48px;
`;

export const IconClosed = styled(MaterialCommunityIcons).attrs((props) => ({
  size: props.theme.icon.size.large,
  color: props.theme.colors.gray,
}))``;

export const ContainerHeader = styled.View`
  flex: 1;
  padding-left: 15px;
  padding-right: 15px;

  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.powderWhite};
  padding-top: ${Constants.statusBarHeight + "px"};
`;

export const ContainerTitle = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonPhrase = styled.TouchableOpacity``;

export const Phrase = styled.Text`
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const ContainerBody = styled.View`
  flex: 1;

  justify-content: center;
  align-items: stretch;

  background-color: ${(props) => props.theme.colors.powderWhite};
`;

export const Label = styled.Text`
  color: ${(props) => props.theme.colors.errors.darkRed};
  text-align: left;
`;

export const ContainerLabel = styled.View`
  height: 20px;

  padding-left: 15px;
`;

export const ContainerForm = styled.View`
  flex: 1;

  flex-direction: row;

  padding-left: 15px;
  padding-right: 15px;

  justify-content: space-between;
`;

export const ContainerBorder = styled.View<ContainerBorderProps>`
  flex: 1;
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
  flex: 1;

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
export const ContainerInputView = styled.View`
  flex: 1;
  height: 120px;
`;

export const ContainerInput = styled.View<ContainerInputProps>`
  flex: 1;

  border-width: 5px;
  border-color: ${(props) => props.theme.colors.transparent.blackGray};
  border-radius: 10px;

  background-color: ${(props) => props.theme.colors.powderWhite};

  justify-content: center;
  align-items: center;

  ${(props) =>
    !!props.error &&
    css`
      border-color: ${props.theme.colors.errors.darkRed};
    `}
`;

export const ContainerButton = styled.View`
  height: 80px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.background};

  font-family: ${(props) => props.theme.fonts["Lato-Black"]};

  font-size: ${(props) => props.theme.fontSizes.title};

  text-align: center;
`;

export const ContainerFooter = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  height: 150px;

  justify-content: center;
  align-items: stretch;

  background-color: ${(props) => props.theme.colors.powderWhite};
`;

export const TitleCode = styled.Text`
  font-family: ${(props) => props.theme.fonts["Lato-Bold"]};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.background};
  text-align: center;
`;

export const InputTextComponent = styled.TextInput`
  position: absolute;
  width: 100%;
  height: 90px;

  margin: 15px;
  color: transparent;
  background-color: transparent;
`;
