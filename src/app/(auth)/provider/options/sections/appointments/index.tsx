import {
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

export default function ProviderAppointments() {

  return (
    <Container>

      <ContainerBody>
        <ContainerAppointmentsToConfirm>
          <ContainerAppointment>

          </ContainerAppointment>
        </ContainerAppointmentsToConfirm>
        <ContainerAppointmentsNext>

        </ContainerAppointmentsNext>
      </ContainerBody>
    </Container>
  );
}
