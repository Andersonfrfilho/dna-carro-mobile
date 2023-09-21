import styled from "styled-components/native";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { Animated } from "react-native";

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

export const ContainerHeader = styled.View`
  flex: 5;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.powderWhite};
  padding-top: ${Constants.statusBarHeight + "px"};

  border-bottom-right-radius: 100px;
  border-bottom-left-radius: 100px;
`;

export const ContainerImage = styled(Animated.View)`
  flex: 2;
  justify-content: center;
  align-items: center;

  padding-top: 20px;
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

export const LogoImage = styled(Image).attrs((props) => ({
  contentFit: "contain",
}))`
  flex: 1;
  width: 60%;
  height: 60%;
`;
export const ContainerLogo = styled.View`
  flex: 1;
`;

export const ContainerBody = styled.View`
  height: 150px;
  flex-direction: row;

  justify-content: center;
  align-items: stretch;

  background-color: ${(props) => props.theme.colors.powderWhite};
`;

export const ContainerSignIn = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;

  border-top-right-radius: 100px;

  margin-right: 1px;

  background-color: ${(props) => props.theme.colors.lightBlue};
`;

export const ButtonSignIn = styled.TouchableHighlight.attrs((props) => ({
  underlayColor: props.theme.colors.transparent.persianBlue,
}))`
  background-color: ${(props) => props.theme.colors.backgroundColor};

  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;

  border-radius: 60px;
  border-width: 4px;
  border-color: ${(props) => props.theme.colors.lightGray};
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.background};

  font-family: ${(props) => props.theme.fonts["Lato-Black"]};

  font-size: ${(props) => props.theme.fontSizes.title};

  text-align: center;
`;

export const ContainerSignUp = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;

  border-top-left-radius: 100px;

  background-color: ${(props) => props.theme.colors.lightBlue};

  margin-left: 1px;
`;

export const ButtonBorder = styled.View`
  justify-content: center;
  align-items: center;

  width: 120px;
  height: 120px;

  border-radius: 60px;

  border-width: 4px;
  border-color: ${(props) => props.theme.colors.darkGray};
`;
export const ButtonBorderSecond = styled.View`
  width: 100%;
  height: 100%;

  border-radius: 60px;

  border-width: 4px;
  border-color: ${(props) => props.theme.colors.silver};

  background-color: ${(props) => props.theme.colors.powderWhite};
`;
export const ButtonSignUp = styled.TouchableHighlight.attrs((props) => ({
  underlayColor: props.theme.colors.transparent.persianBlue,
}))`
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
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.background};
  text-align: center;
`;
