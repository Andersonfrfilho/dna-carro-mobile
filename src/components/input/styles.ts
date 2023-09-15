import { RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  height: 80px;
  width: 100%;
`;
export const ContainerBorder = styled.View`
  border-width: 5px;
  border-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
`;
export const ContainerSecondBorder = styled.View`
  border-width: 5px;
  border-color: #fff;
  border-radius: 15px;
`;
export const ContainerLabel = styled.View`
  height: 20px;
`;
export const ContainerInput = styled.View`
  border-width: 5px;
  border-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

export const Label = styled.Text``;

export const InputComponent = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.colors.secondary,
}))`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.powderWhite};
  font-size: ${RFPercentage(2)}px;

  padding-left: 10px;
`;
