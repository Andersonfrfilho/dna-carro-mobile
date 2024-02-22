import {
  AppointmentToNextList,
  AppointmentsToCreatedList,
  AreaAppointmentTitle,
  AreaAppointmentsContent,
  Container,
  ContainerAppointmentsNext,
  ContainerAppointmentsToConfirm,
  ContainerBody,
  Title,
} from "./styles";
import { useProvider } from "../../../../../../context/provider/provider.context";
import { useEffect, useState } from "react";
import { AppointmentStatus } from "../../../../../../context/constants/appointment.constant";
import ProviderHomeAppointmentsSkeleton from "../../../../../../components/provider/home/skeletons";
import AppointmentItemList from "../../../../../../components/provider/home/appointmentsItemList";
import { Appointment } from "../../../../../../services/api/providers/providers.interface";

export default function ProviderOptionsSectionsHome() {
  const { getAppointmentByStatus, appointmentsConfirmLoading, appointmentsCreateLoading, setAppointmentsConfirmLoading, setAppointmentsCreateLoading, handleSelectAppointment } = useProvider();

  const [appointmentsToNext, setAppointmentsToNext] = useState<Appointment[]>([]);
  const [appointmentsToCreated, setAppointmentsToCreated] = useState<Appointment[]>([]);

  async function handleGetAppointmentCreate() {
    setAppointmentsCreateLoading(true)
    try {
      const appointmentsCreated = await getAppointmentByStatus(AppointmentStatus.created);
      setAppointmentsToCreated(appointmentsCreated.created.results.filter((appointment, index) => index < 3))
    } catch {
    } finally {
      setAppointmentsCreateLoading(false)
    }
  }

  async function handleGetAppointmentConfirm() {
    setAppointmentsConfirmLoading(true)
    try {
      const appointmentsConfirm = await getAppointmentByStatus(AppointmentStatus.confirm);
      setAppointmentsToNext(appointmentsConfirm.confirm.results.filter((appointment, index) => index < 3))
    } catch {
    } finally {
      setAppointmentsConfirmLoading(false)
    }
  }
  useEffect(() => {
    handleGetAppointmentCreate()
    handleGetAppointmentConfirm()
  }, [])

  return (
    <Container>
      <ContainerBody>
        <ContainerAppointmentsToConfirm>
          <AreaAppointmentTitle>
            <Title>Agendamentos em abertos:</Title>
          </AreaAppointmentTitle>
          <AreaAppointmentsContent>
            {appointmentsCreateLoading ? (
              <>
                <ProviderHomeAppointmentsSkeleton />
                <ProviderHomeAppointmentsSkeleton />
                <ProviderHomeAppointmentsSkeleton />
              </>
            ) : <AppointmentsToCreatedList
              data={appointmentsToCreated}
              renderItem={(appointment) => <AppointmentItemList {...appointment} handlePressSelectAppointment={(id) => handleSelectAppointment(id)} />}
            />}
          </AreaAppointmentsContent>
        </ContainerAppointmentsToConfirm>
        <ContainerAppointmentsNext>
          <AreaAppointmentTitle>
            <Title>Próximos Agendamentos:</Title>
          </AreaAppointmentTitle>
          <AreaAppointmentsContent>
            {appointmentsConfirmLoading ?
              (<>
                <ProviderHomeAppointmentsSkeleton />
                <ProviderHomeAppointmentsSkeleton />
                <ProviderHomeAppointmentsSkeleton />
              </>) :
              <AppointmentToNextList
                data={appointmentsToNext}
                renderItem={(appointment) => <AppointmentItemList {...appointment} handlePressSelectAppointment={(id) => handleSelectAppointment(id)} />}
              />

            }
          </AreaAppointmentsContent>
        </ContainerAppointmentsNext>
      </ContainerBody>
    </Container>
  );
}
