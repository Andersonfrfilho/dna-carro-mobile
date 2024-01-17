import styled from "styled-components/native";
import Constants from "expo-constants";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContainerLoading = styled.View`
  flex: 1;
`;

export const ContainerHeader = styled.View`
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.powderWhite};
  padding-top: ${Constants.statusBarHeight + "px"};
  height: 380px;
  margin-bottom: 20px;
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

export const ContainerBody = styled.ScrollView`
  flex: 3;
  padding-left: 15px;
  padding-right: 15px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.background};

  font-family: ${(props) => props.theme.fonts["Lato-Black"]};

  font-size: ${(props) => props.theme.fontSizes.title};

  text-align: center;
`;
