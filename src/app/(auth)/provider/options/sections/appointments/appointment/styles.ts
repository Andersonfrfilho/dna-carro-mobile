import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const ContainerAppointmentTitle = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const AppointmentTitle = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Bold"]};
  font-size: ${(props) => props.theme.fontSizes.large};
  text-align: center;
`;

export const ContainerAppointmentClient = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const ContainerAppointmentClientImage = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const AppointmentClientImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const ContainerAppointmentClientInfos = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

export const ContainerAppointmentClientInfoNameLastName = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const AppointmentClientInfoNameLastName = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const ContainerAppointmentClientInfoPhone = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const AppointmentClientInfoPhone = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const ContainerAppointmentAddress = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const ContainerAppointmentAddressInfos = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

export const ContainerAppointmentAddressNumberInfo = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

export const ContainerAppointmentAddressInfoZipcode = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

export const ContainerAppointmentAddressInfoDistrictCity = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
export const ContainerAppointmentAddressInfoComplementReference = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

export const AppointmentAddressInfoAddressNumber = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
export const AppointmentAddressInfoZipcode = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
export const AppointmentAddressInfoDistrictCity = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
export const AppointmentAddressInfoComplementReference = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
export const ContainerAppointmentServices = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
export const ContainerAppointmentService = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
export const ContainerAppointmentServiceNameInfo = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
export const AppointmentServiceNameInfo = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
export const ContainerAppointmentServiceInfoAmount = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
export const AppointmentServiceInfoAmount = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
export const ContainerAppointmentServicesTotal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
export const AppointmentServicesTotal = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const ContainerAppointmentDate = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
export const ContainerAppointmentInitialDateInfo = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
export const AppointmentInitialDateInfoDate = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
export const ContainerAppointmentFinalDateInfo = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
export const AppointmentFinalDateInfoDate = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
export const ContainerAppointmentStatusActions = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
export const ContainerAppointmentStatusActionsCancel = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
export const AppointmentStatusActionsCancel = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
export const ContainerAppointmentStatusActionsConfirm = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
export const AppointmentStatusActionsConfirm = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fonts["Roboto-Regular"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
