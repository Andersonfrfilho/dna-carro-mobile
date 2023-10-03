import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const ContainerHeader = styled.View`
  flex-direction: row;

  height: 80px;

  background-color: ${(props) => props.theme.colors.darkGray};
`;
export const ContainerButtonClosed = styled.View`
  flex: 1;

  background-color: ${(props) => props.theme.colors.lightBlue};
`;
export const ButtonIcon = styled.TouchableOpacity`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const ContainerInputIconSearch = styled.View`
  flex: 4;

  flex-direction: row;
`;

export const ContainerIconSearch = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const ContainerInputSearch = styled.View`
  flex: 4;

  justify-content: center;
  align-items: flex-start;
`;

export const InputSearch = styled.TextInput`
  text-align: left;

  padding-left: 10px;
`;

export const ContainerBody = styled.View`
  flex: 1;
`;

export const List = styled.FlatList`
  flex: 1;
`;

export const ContainerOption = styled.View`
  justify-content: center;
  align-items: center;

  height: 120px;

  border-radius: 10px;

  border-width: 4px;
  border-color: ${(props) => props.theme.colors.darkGray};
  background-color: ${(props) => props.theme.colors.lightGray};
`;

export const ButtonBorder = styled.View`
  width: 100%;
  height: 100%;

  border-radius: 60px;

  border-width: 4px;
  border-color: ${(props) => props.theme.colors.silver};

  background-color: ${(props) => props.theme.colors.transparent.highlightColor};
`;

export const Button = styled.TouchableHighlight.attrs((props) => ({
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

export const ButtonTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts["Lato-Bold"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.background};
  text-align: center;
`;

export const Icon = styled(MaterialCommunityIcons).attrs((props) => ({
  size: 28,
  color: props.theme.colors.gray,
}))``;
