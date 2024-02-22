import styled from "styled-components/native";
import Constants from "expo-constants";
import { Appointment } from "../../../../../../services/api/providers/providers.interface";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContainerLoading = styled.View`
  flex: 1;
`;

export const ContainerHeader = styled.View`
  align-items: stretch;
  padding-top: ${Constants.statusBarHeight + "px"};
  height: 380px;
  margin-bottom: 20px;
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

export const ContainerBody = styled.View`
  flex: 3;
  padding-left: 15px;
  padding-right: 15px;
`;

export const ContainerAppointmentsToConfirm = styled.View`
  flex: 1;

  justify-content: space-around;
`;

export const ContainerAppointment = styled.View`
  flex: 1;
`;

export const ContainerAppointmentsNext = styled.View`
  flex: 1;

  justify-content: space-around;
`;
export const AreaAppointmentTitle = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
`;
export const AreaAppointmentsContent = styled.View`
  flex: 4;
  overflow: hidden;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.background};

  font-family: ${(props) => props.theme.fonts["Roboto-Bold"]};

  font-size: ${(props) => props.theme.fontSizes.large};

  text-align: center;
`;

export const AppointmentToNextList = styled.FlatList`
  flex: 1;
`;

export const AppointmentsToCreatedList = styled.FlatList`
  flex: 1;
`;
