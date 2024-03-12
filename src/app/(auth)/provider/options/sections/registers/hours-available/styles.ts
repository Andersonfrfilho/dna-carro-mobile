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
export const ContainerSubTitle = styled.View`
  height: 60px;
`;

export const SubTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
export const Body = styled.View`
  flex: 6;
`;

export const ContainerButtonDaysAvailable = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const DaysAvailableList = styled.FlatList`
  flex: 5;
`;

export const ContainerButtonDayAvailable = styled.TouchableOpacity<ContainerButtonDayAvailableProps>`
  height: 60px;
  border-radius: 10px;
  margin: 10px;
  justify-content: center;
  align-items: center;

  width: 20%;

  border: 3px solid ${(props) => props.theme.colors.gray};

  background-color: ${(props) => props.theme.colors.powderWhite};

  ${(props) =>
    props.selected &&
    css`
      background-color: ${props.theme.colors.persianGreen};
    `}

  ${(props) =>
    props.firstTime &&
    css`
      background-color: ${props.theme.colors.primaryColor};
    `}

  ${(props) =>
    props.lastTime &&
    css`
      background-color: ${props.theme.colors.highlightColor};
    `}
`;

export const DayAvailableTitle = styled.Text<ContainerButtonDayAvailableProps>`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.large};

  ${(props) =>
    props.selected &&
    css`
      color: ${(props) => props.theme.colors.lightGray};
    `}
`;

export const ContainerConfirmButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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
