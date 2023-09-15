import styled from "styled-components/native";
import Constants from "expo-constants";
import { RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.lightBlue};
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
  font-size: ${RFPercentage(2)}px;
`;

export const ContainerLogo = styled.View`
  flex: 1;
`;

export const ContainerBody = styled.View`
  flex: 1;

  justify-content: center;
  align-items: stretch;

  background-color: ${(props) => props.theme.colors.powderWhite};
`;

export const ContainerForm = styled.View`
  flex: 1;

  padding-left: 15px;
  padding-right: 15px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.background};

  font-family: ${(props) => props.theme.fonts["Lato-Black"]};

  font-size: ${RFPercentage(5)}px;

  text-align: center;
`;
