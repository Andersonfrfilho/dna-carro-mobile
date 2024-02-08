import { ContainerAppointment } from "../../../../app/(auth)/provider/options/sections/appointments/styles";
import { Skeleton } from "../../../skeleton";
import { ContainerAppointmentClientImage, ContainerAppointmentInfo, ContainerAppointmentInfos, ContainerAppointmentsCreated } from "./styles";

export default function ProviderHomeAppointmentsCreatedSkeleton() {
  return (
    <ContainerAppointmentsCreated>
      <ContainerAppointmentClientImage>
        <Skeleton height={100} width={100} variant="circle" />
      </ContainerAppointmentClientImage>
      <ContainerAppointmentInfos>
        <ContainerAppointmentInfo>
          <Skeleton height={20} width={100} />
        </ContainerAppointmentInfo>
        <ContainerAppointmentInfo>
          <Skeleton height={20} width={100} />
        </ContainerAppointmentInfo>
        <ContainerAppointmentInfo>
          <Skeleton height={20} width={100} />
        </ContainerAppointmentInfo>
      </ContainerAppointmentInfos>
    </ContainerAppointmentsCreated>
  );
}