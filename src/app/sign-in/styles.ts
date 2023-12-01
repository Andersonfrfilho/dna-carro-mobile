import styled from "styled-components/native";
import Constants from "expo-constants";
import { RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.secondary};
  flex: 1;
  justify-content: space-between;
  align-items: stretch;
`;

export const ContainerHeader = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.primary};
  padding-top: ${Constants.statusBarHeight + "px"};

  border-bottom-right-radius: 130px;
`;

export const ContainerLogo = styled.View`
  flex: 1;
`;

export const ContainerBody = styled.View`
  flex: 2;

  background-color: ${(props) => props.theme.colors.secondary};

  justify-content: center;
  align-items: stretch;

  padding: 20px 20px 0px 20px;
`;
export const ContainerTitle = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFPercentage(3)}px;
`;

export const ContainerForm = styled.View`
  flex: 2;
  align-items: stretch;
`;
export const ContainerInput = styled.View`
  flex: 1;
  align-items: stretch;
`;

export const ContainerLinks = styled.View`
  flex: 1;

  flex-direction: row;

  justify-content: space-around;
  align-items: center;
`;

export const ContainerLink = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const Link = styled.Text``;

export const ContainerButton = styled.View`
  flex: 1;
`;
