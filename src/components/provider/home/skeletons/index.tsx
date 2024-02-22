import { RFValue } from "react-native-responsive-fontsize";
import { Skeleton } from "../../../skeleton";
import { ContainerAppointmentClientImage, ContainerAppointmentInfo, ContainerAppointmentInfos, ContainerAppointmentsCreated } from "./styles";

export default function ProviderHomeAppointmentsSkeleton() {
  return (
    <ContainerAppointmentsCreated>
      <ContainerAppointmentClientImage>
        <Skeleton height={RFValue(80)} width={90} variant="circle" />
      </ContainerAppointmentClientImage>
      <ContainerAppointmentInfos>
        <ContainerAppointmentInfo>
          <Skeleton height={20} width={'100%'} />
        </ContainerAppointmentInfo>
        <ContainerAppointmentInfo>
          <Skeleton height={20} width={'85%'} />
        </ContainerAppointmentInfo>
        <ContainerAppointmentInfo>
          <Skeleton height={20} width={'100%'} />
        </ContainerAppointmentInfo>
      </ContainerAppointmentInfos>
    </ContainerAppointmentsCreated>
  );
}