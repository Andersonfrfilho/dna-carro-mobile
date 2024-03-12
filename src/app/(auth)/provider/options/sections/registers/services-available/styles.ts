import styled, { css } from "styled-components/native";

interface ContainerButtonDayAvailableProps {
  selected: boolean;
  firstTime: boolean;
  lastTime: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.large};
`;

export const Body = styled.View`
  flex: 6;
`;
export const ContainerInputsService = styled.ScrollView``;
export const ContainerConfirmButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ContainerConfirmButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ConfirmButtonTitle = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts["Roboto-Bold"]};
  font-size: ${(props) => props.theme.fontSizes.large};
`;

export const ContainerInputName = styled.View`
  height: 80px;

  margin-bottom: 30px;
`;

export const ContainerSelectDuration = styled.View`
  height: 80px;

  align-items: stretch;
  justify-content: stretch;
`;

export const ContainerInputAmount = styled.View`
  height: 80px;
`;

export const ContainerInputDescription = styled.View`
  height: 160px;

  margin-bottom: 30px;
`;
