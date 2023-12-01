import styled, { css } from "styled-components/native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Camera, CameraType } from "expo-camera";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContainerHeader = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.powderWhite};
  padding-top: ${Constants.statusBarHeight + "px"};
`;
export const ContainerBody = styled.View`
  flex: 4;
`;

export const ContainerFooter = styled.View`
  height: 120px;

  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;

  height: 150px;
`;
export const ContainerButton = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const ComponentCamera = styled(Camera)`
  flex: 1;

  justify-content: space-between;
`;
export const ContainerImage = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
export const ComponentImage = styled.Image`
  flex: 1;
  position: absolute;
  height: 100%;
  width: 100%;
`;
