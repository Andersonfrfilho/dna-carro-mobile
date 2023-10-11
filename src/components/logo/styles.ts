import styled from "styled-components/native";
import { Image } from "expo-image";
import { RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
`;

export const ContainerImage = styled.View`
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

export const Title = styled.Text`
  text-align: center;
  font-size: ${RFPercentage(5)}px;
  color: white;
`;

export const LogoImage = styled(Image)`
  flex: 1;
  width: 60%;
  height: 60%;
`;
