import styled from "styled-components/native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

export const ContainerForm = styled.ScrollView`
  padding-left: 15px;
  padding-right: 15px;
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

export const ContainerInput = styled.View`
  flex: 1;

  height: 80px;
  margin-bottom: 20px;
`;

export const IconClosed = styled(MaterialCommunityIcons).attrs((props) => ({
  size: props.theme.icon.size.large,
  color: props.theme.colors.gray,
}))``;
