import styled, { css } from "styled-components/native";
import Constants from "expo-constants";
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
  flex: 1;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.powderWhite};
  padding-top: ${Constants.statusBarHeight + "px"};
`;

export const ContainerTitle = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Phrase = styled.Text`
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const ContainerLogo = styled.View`
  flex: 1;
`;

export const ContainerBody = styled.View`
  flex: 4;
`;

export const ContainerForm = styled.View`
  flex: 1;

  padding-left: 15px;
  padding-right: 15px;
`;

export const ContainerInputLocation = styled.View`
  flex: 1;

  flex-direction: row;
`;

export const ContainerButtonLocation = styled.TouchableOpacity`
  flex: 1;
  height: 80px;

  justify-content: center;
  align-items: center;
`;

export const Icon = styled(MaterialCommunityIcons).attrs((props) => ({
  size: props.theme.icon.size.median,
}))``;

export const ContainerMapView = styled.View`
  flex: 4;
`;

export const ContainerInput = styled.View`
  flex: 4;

  justify-content: center;
  align-items: stretch;

  /* border-width: 4px; */
  /* border-color: ${(props) => props.theme.colors.darkGray}; */
  /* background-color: ${(props) => props.theme.colors.lightGray}; */
`;

export const ContainerButtonGender = styled.View<ContainerBorderProps>`
  height: 80px;
  margin-top: 20px;

  ${(props) => {
    return (
      !!props.error &&
      css`
        margin-bottom: 20px;
      `
    );
  }}
`;

export const ContainerBirthDate = styled.View`
  height: 80px;
  margin-top: 20px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.background};

  font-family: ${(props) => props.theme.fonts["Lato-Black"]};

  font-size: ${(props) => props.theme.fontSizes.title};

  text-align: center;
`;

export const ContainerFooter = styled.View`
  height: 120px;

  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;
