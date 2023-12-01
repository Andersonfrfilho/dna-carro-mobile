import styled, { css } from "styled-components/native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

interface ErrorProps {
  error?: string;
}

interface PropsInputAutoCompleteSelect {
  selectAddress: boolean;
}
interface ContainerBorderProps extends ErrorProps {}
export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContainerHeader = styled.View`
  flex: 1;
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

export const Phrase = styled.Text`
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const ContainerBody = styled.View`
  flex: 4;
`;

export const ContainerForm = styled.TouchableHighlight<PropsInputAutoCompleteSelect>`
  flex: 1;

  padding-left: 15px;
  padding-right: 15px;
  position: absolute;
  z-index: 10;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  background-color: ${(props) => props.theme.colors.transparent.onyx};

  ${(props) =>
    !props.selectAddress &&
    css`
      height: 20%;
      background-color: transparent;
    `}
`;

export const ContainerInputLocation = styled.View`
  flex: 1;
`;

export const ContainerMapView = styled.View`
  flex: 4;

  justify-content: flex-end;
`;
export const ComponentMapView = styled(MapView).attrs({
  provider: PROVIDER_GOOGLE,
})`
  width: 100%;
  height: 100%;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.background};

  font-family: ${(props) => props.theme.fonts["Lato-Black"]};

  font-size: ${(props) => props.theme.fontSizes.title};

  text-align: center;
`;

export const ContainerFooter = styled.View`
  height: 120px;

  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

export const ContainerBorder = styled.View<ContainerBorderProps>`
  flex: 1;
  border-width: 5px;
  border-radius: 20px;
  border-color: ${(props) => props.theme.colors.transparent.blackGray};
`;
export const ContainerSecondBorder = styled.View`
  flex: 1;
  border-width: 5px;
  border-color: ${(props) => props.theme.colors.backgroundColor};
  border-radius: 15px;
`;

export const ContainerLabelDescription = styled.View`
  flex: 1;

  background-color: ${(props) => props.theme.colors.powderWhite};

  padding: 5px;

  border-width: 5px;
  border-color: ${(props) => props.theme.colors.transparent.blackGray};
  border-radius: 10px;
`;

export const LabelAddressDescription = styled.Text`
  text-align: center;

  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.background};
`;

export const ContainerButtons = styled.View`
  top: calc(100%-150px);
  position: absolute;

  height: 150px;
  width: 100%;

  flex-direction: row;
`;

export const ContainerEditableButton = styled.TouchableHighlight`
  flex: 1;

  justify-content: center;
  align-items: center;

  padding: 5px;

  border-radius: 40px;
`;

export const ContainerConfirmButton = styled.TouchableHighlight`
  flex: 1;

  justify-content: center;
  align-items: center;
`;
