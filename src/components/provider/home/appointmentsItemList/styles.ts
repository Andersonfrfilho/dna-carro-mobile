import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { AppointmentStatus } from "../../../../context/constants/appointment.constant";
import { css } from "styled-components";
import { theme } from "../../../../style/theme.style";

const handleBackgroundColor = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.cancel:
      return theme.colors.errors.whiteRed;
    case AppointmentStatus.confirm:
      return theme.colors.persianGreen;
    case AppointmentStatus.created:
      return theme.colors.highlightColor;
    case AppointmentStatus.expired:
      return theme.colors.errors.purple;
    default:
      return theme.colors.primary;
  }
};

interface ContainerAppointmentProps {
  status: AppointmentStatus;
}

export const ContainerAppointment = styled.TouchableOpacity<ContainerAppointmentProps>`
  flex: 1;
  flex-direction: row;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: ${({ theme, status }) => handleBackgroundColor(status)};
`;
export const ContainerAppointmentClientImage = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;
export const ClientProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;
export const ContainerAppointmentInfos = styled.View`
  flex: 2;
  justify-content: center;
  align-items: flex-start;
`;
export const ContainerAppointmentClientName = styled.View`
  margin-vertical: 8px;
  justify-content: center;
  align-items: flex-start;
`;
export const InfoAppointmentClientName = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: ${({ theme }) => theme.fonts["Lato-Black"]};
`;

export const ContainerAppointmentAddress = styled.View`
  margin-vertical: 8px;
  justify-content: center;
  align-items: flex-start;
`;
export const ContainerInfosZipCodeDateStatus = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ContainerZipCodeDate = styled.View`
  flex: 5;
`;

export const InfoAppointmentAddress = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: ${({ theme }) => theme.fonts["Lato-Black"]};
`;
export const ContainerAppointmentZipCode = styled.View`
  margin-vertical: 8px;

  justify-content: center;
  align-items: flex-start;
`;
export const InfoAppointmentZipCode = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: ${({ theme }) => theme.fonts["Lato-Black"]};
`;
export const ContainerAppointmentDateInitial = styled.View`
  margin-vertical: 8px;

  justify-content: center;
  align-items: flex-start;
`;
export const InfoAppointmentDateInitial = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: ${({ theme }) => theme.fonts["Lato-Black"]};
`;

export const ContainerAppointmentStatusIcon = styled.TouchableOpacity`
  flex: 1;
`;
export const AppointmentStatusIcon = styled(MaterialIcons)``;
