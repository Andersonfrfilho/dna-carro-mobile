import { RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const InputComponent = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.colors.secondary,
}))`
  width: 100%;
  height: ${RFPercentage(5)}px;
  color: ${(props) => props.theme.colors.secondary};
  border: solid;
  border-width: 2px;

  border-radius: 5px 5px 25px 5px;

  padding-left: 5px;

  font-size: ${RFPercentage(2)}px;

  background-color: rgba(52, 52, 52, 0.7);
`;
