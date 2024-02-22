import styled from "styled-components/native";
import Constants from "expo-constants";

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Header = styled.View`
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.powderWhite};
  padding-top: ${Constants.statusBarHeight + "px"};
  height: 380px;
  margin-bottom: 20px;
`;
export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.large};
`;
export const Body = styled.View`
  flex: 1;
`;
export const ContainerButtonDaysAvailable = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const ContainerButtonHoursAvailable = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const ContainerButtonServices = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
