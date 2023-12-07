import styled from "styled-components/native";
import Constants from "expo-constants";

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
  font-size: ${(props) => props.theme.fontSizes.medium};
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

export const ContainerInput = styled.View`
  height: 80px;
  margin-bottom: 30px;
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
  height: 150px;
  flex-direction: row;

  justify-content: center;
  align-items: stretch;

  background-color: ${(props) => props.theme.colors.powderWhite};
`;
