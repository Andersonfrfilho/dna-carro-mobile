import { useTheme } from "styled-components";
import { AppointmentStatusIcon, ClientProfileImage, ContainerAppointment, ContainerAppointmentAddress, ContainerAppointmentClientImage, ContainerAppointmentClientName, ContainerAppointmentDateInitial, ContainerAppointmentInfos, ContainerAppointmentStatusIcon, ContainerAppointmentZipCode, ContainerInfosZipCodeDateStatus, ContainerZipCodeDate, InfoAppointmentAddress, InfoAppointmentClientName, InfoAppointmentConfirmButton, InfoAppointmentDateInitial, InfoAppointmentZipCode } from "./styles";
import { formatHourAndDayMonth } from "../../../../utils/formatDate.util";
import { Appointment } from "../../../../services/api/providers/providers.interface";
import { ListRenderItemInfo } from "react-native";

interface Props extends ListRenderItemInfo<Appointment> {
  handlePressSelectAppointment: (id: string) => void
}

export default function AppointmentItemList(props: Readonly<Props>) {
  const theme = useTheme();
  return (
    <ContainerAppointment onPress={() => props.handlePressSelectAppointment(props.item.id)} style={theme.shadows} status={props.item.status}>
      <ContainerAppointmentClientImage>
        <ClientProfileImage
          source={{
            uri: props.item?.appointmentClients[0]?.client.userClientImageProfiles[0]?.imageProfile.url || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }}
          defaultSource={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }}
        />
      </ContainerAppointmentClientImage>
      <ContainerAppointmentInfos>
        <ContainerAppointmentClientName>
          <InfoAppointmentClientName numberOfLines={1}>{`${props.item?.appointmentClients[0]?.client.name} ${props.item?.appointmentClients[0]?.client.lastName}`}</InfoAppointmentClientName>
        </ContainerAppointmentClientName>
        <ContainerAppointmentAddress>
          <InfoAppointmentAddress numberOfLines={1}>{`${props.item?.appointmentAddresses[0]?.address.street} ${props.item?.appointmentAddresses[0]?.address.number}`}</InfoAppointmentAddress>
        </ContainerAppointmentAddress>
        <ContainerInfosZipCodeDateStatus>
          <ContainerZipCodeDate>
            <ContainerAppointmentZipCode>
              <InfoAppointmentZipCode>{props.item?.appointmentAddresses[0]?.address.zipcode}</InfoAppointmentZipCode>
            </ContainerAppointmentZipCode>
            <ContainerAppointmentDateInitial>
              <InfoAppointmentDateInitial>{formatHourAndDayMonth(props.item.initialDate)}</InfoAppointmentDateInitial>
            </ContainerAppointmentDateInitial>
          </ContainerZipCodeDate>
          <ContainerAppointmentStatusIcon>
            <AppointmentStatusIcon
              name="done"
              size={24}
              color={theme.colors.primary}
            />
          </ContainerAppointmentStatusIcon>
        </ContainerInfosZipCodeDateStatus>
      </ContainerAppointmentInfos>
    </ContainerAppointment>
  );
}