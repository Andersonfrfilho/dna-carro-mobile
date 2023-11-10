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

export const ContainerInput = styled.View`
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

export const ButtonBorder = styled.View`
  justify-content: center;
  align-items: center;

  width: 120px;
  height: 120px;

  border-radius: 60px;

  border-width: 4px;
  border-color: ${(props) => props.theme.colors.darkGray};
  background-color: ${(props) => props.theme.colors.lightGray};
`;

export const ButtonBorderSecond = styled.View`
  width: 100%;
  height: 100%;

  border-radius: 60px;

  border-width: 4px;
  border-color: ${(props) => props.theme.colors.silver};

  background-color: ${(props) => props.theme.colors.transparent.highlightColor};
`;

export const ButtonFirstStep = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.backgroundColor};

  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;

  border-radius: 60px;
  border-width: 4px;
  border-color: ${(props) => props.theme.colors.lightGray};
`;

export const TitleButton = styled.Text`
  font-family: ${(props) => props.theme.fonts["Lato-Bold"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.background};
  text-align: center;
`;
