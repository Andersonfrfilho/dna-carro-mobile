import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export const Container = styled.View`
  justify-content: center;
  align-items: center;

  width: 120px;
  height: 120px;

  border-radius: 60px;

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

export const Icon = styled(MaterialCommunityIcons).attrs((props) => ({
  size: props.theme.icon.size.median,
  color: props.theme.colors.silver,
}))``;
