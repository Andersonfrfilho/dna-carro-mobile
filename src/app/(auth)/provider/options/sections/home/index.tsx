import { FlatList } from "react-native";
import {
  AppointmentToConfirmList,
  Container,
  ContainerAppointment,
  ContainerAppointmentsNext,
  ContainerAppointmentsToConfirm,
  ContainerBody,
  ContainerHeader,
  ContainerTitle,
  Phrase,
  Title,
} from "./styles";
import { useProvider } from "../../../../../../context/provider/provider.context";
import { useEffect, useState } from "react";
import { AppointmentStatus } from "../../../../../../context/constants/appointment.constant";

export default function ProviderOptionsSectionsHome() {
  const { getAppointmentByStatus, setAppointmentsConfirmLoading, setAppointmentsCreateLoading } = useProvider();

  const [appointmentsToConfirm, setAppointmentsToConfirm] = useState([]);
  const [appointmentsToCreated, setAppointmentsToCreated] = useState([]);

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
      setAppointmentsToConfirm(appointmentsConfirm.confirm.results.filter((appointment, index) => index < 3))
    } catch {
    } finally {
      setAppointmentsConfirmLoading(false)
    }
  }
  useEffect(() => {
    handleGetAppointmentCreate()
    handleGetAppointmentConfirm()
  }, [])
  console.log(appointmentsToConfirm);
  console.log(appointmentsToCreated);
  return (
    <Container>
      <ContainerBody>
        <ContainerAppointmentsToConfirm>
          <Title>Agendamentos para confirmar</Title>
          <AppointmentToConfirmList
            data={[]}
            renderItem={() => <Title>Agendamentos</Title>}
          />
        </ContainerAppointmentsToConfirm>
        <ContainerAppointmentsNext>
        </ContainerAppointmentsNext>
      </ContainerBody>
    </Container>
  );
}
