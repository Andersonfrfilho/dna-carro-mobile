import styled, { css } from "styled-components/native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ErrorProps {
  error?: boolean;
}
interface SelectedProps {
  select: boolean;
}

export const ContainerModal = styled.Modal`
  flex: 1;
  justify-content: space-between;
  align-items: stretch;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.transparent.onyx};
`;

export const ContainerHeader = styled.View`
  flex: 1;
  padding-left: 15px;
  padding-right: 15px;

  flex-direction: row;

  background-color: ${(props) => props.theme.colors.powderWhite};
  padding-top: ${Constants.statusBarHeight + "px"};
`;

export const ContainerTitle = styled.View`
  flex: 4;
  justify-content: center;
  align-items: center;
`;

export const ContainerButtonClosed = styled.TouchableHighlight`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const ContainerBody = styled.View`
  flex: 13;

  justify-content: center;
  align-items: stretch;
`;

export const ContainerButton = styled.View`
  flex: 1;

  height: 80px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Phrase = styled.Text`
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const IconClosed = styled(MaterialCommunityIcons).attrs((props) => ({
  size: props.theme.icon.size.large,
  color: props.theme.colors.gray,
}))``;

export const DurationList = styled.FlatList``;

export const ContainerButtonSelectDuration = styled.View`
  height: 80px;
`;

export const ButtonSelectDurationTouchable = styled.TouchableHighlight<
  ErrorProps & SelectedProps
>`
  height: 100%;

  justify-content: center;
  align-items: stretch;

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

  ${(props) => {
    return (
      !!props.select &&
      css`
        border-color: ${props.theme.colors.whiteGreenColor};
      `
    );
  }}
`;
export const ContainerSecondBorder = styled.View<ErrorProps & SelectedProps>`
  height: 100%;

  justify-content: center;
  align-items: stretch;

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

  ${(props) => {
    return (
      !!props.select &&
      css`
        border-color: ${props.theme.colors.lightBlue};
      `
    );
  }}
`;

export const ContainerThirdBorder = styled.View<ErrorProps & SelectedProps>`
  height: 100%;

  justify-content: center;
  align-items: center;
  border-width: 5px;
  background-color: ${(props) => props.theme.colors.powderWhite};
  border-color: ${(props) => props.theme.colors.transparent.blackGray};
  border-radius: 10px;

  ${(props) =>
    !!props.error &&
    css`
      border-color: ${props.theme.colors.errors.darkRed};
    `}

  ${(props) =>
    !!props.select &&
    css`
      border-color: ${props.theme.colors.lightBlue};
    `}
`;

export const ButtonSelectTitleDuration = styled.Text<
  ErrorProps & SelectedProps
>`
  justify-content: center;

  color: ${(props) => props.theme.colors.gray};
  font-size: ${(props) => props.theme.fontSizes.mediumX};

  padding-left: 10px;

  ${(props) =>
    !!props.error &&
    css`
      border-color: ${props.theme.colors.errors.red};
      color: ${props.theme.colors.errors.red};
    `}

  ${(props) =>
    !!props.select &&
    css`
      border-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.darkGreen};
      font-weight: 700;
    `}
`;
