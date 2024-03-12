import { FlatList, FlatListProps } from "react-native";
import styled, { css } from "styled-components/native";
import { Service } from "../../../../../services/api/providers/providers.interface";

interface ContainerButtonDayAvailableProps {
  selected: boolean;
  firstTime: boolean;
  lastTime: boolean;
}

interface StyledFlatListProps<ItemT> extends FlatListProps<ItemT> {
  // Adicione aqui as propriedades estilizadas, se necessário
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

export const ListServices = styled(FlatList)<StyledFlatListProps<Service>>``;

export const ContainerButtonService = styled.View`
  height: 80px;

  padding-left: 15px;
  padding-right: 15px;

  margin-bottom: 15px;
`;
