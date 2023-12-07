import styled from "styled-components/native";
import Constants from "expo-constants";
import { Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ErrorProps {
  error?: string;
}

interface ContainerBorderProps extends ErrorProps {}

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContainerModal = styled.Modal`
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

export const LogoImage = styled(Image).attrs((props) => ({
  contentFit: "contain",
}))`
  flex: 1;

  width: 80%;
  height: 80%;
`;

export const Phrase = styled.Text`
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const ContainerLogo = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const ContainerBody = styled.ScrollView`
  flex: 3;
  padding-left: 15px;
  padding-right: 15px;
`;

export const ContainerInput = styled.View`
  flex: 1;

  height: 80px;
  max-height: 80px;
  margin-bottom: 20px;
`;

export const ContainerItens = styled.View`
  margin-top: 20px;

  height: 40px;

  flex-direction: row;
`;

export const Icon = styled(MaterialCommunityIcons).attrs((props) => ({
  size: props.theme.icon.size.large,
  color: props.theme.colors.gray,
}))``;

export const ContainerRememberSession = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;

  justify-content: space-evenly;
  align-items: center;
`;
export const ContainerForgotPassword = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ContainerGoToRegister = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.background};

  font-family: ${(props) => props.theme.fonts["Lato-Black"]};

  font-size: ${(props) => props.theme.fontSizes.title};

  text-align: center;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;

  justify-content: space-evenly;
  align-items: center;

  flex: 1;

  margin-top: 30px;

  height: 120px;
`;
