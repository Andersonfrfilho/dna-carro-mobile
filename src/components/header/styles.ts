import styled from "styled-components/native";
import Constants from "expo-constants";
export const Container = styled.SafeAreaView`
  background-color: ${(props) => {
    return props.theme.colors.background;
  }};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-top: ${Constants.statusBarHeight + "px"};
`;
