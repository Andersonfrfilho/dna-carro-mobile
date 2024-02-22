import { router } from "expo-router";
import ButtonRectangleBorder from "../../../../../../components/button-rectangle";
import {
  Body,
  Container,
  ContainerButtonDaysAvailable,
  ContainerButtonHoursAvailable,
  ContainerButtonServices,
  Header,
  Title,
} from "./styles";

export default function ProviderOptionsSectionsRegister() {
  function handleToGoRegisterAvailableDays() {
    router.push("/provider/options/sections/registers/days-available");
  }
  return (
    <Container>
      <Header>
        <Title>Registros</Title>
      </Header>
      <Body>
        <ContainerButtonDaysAvailable>
          <ButtonRectangleBorder
            title="Dias Disponíveis"
            onPress={handleToGoRegisterAvailableDays}
          />
        </ContainerButtonDaysAvailable>
        <ContainerButtonHoursAvailable>
          <ButtonRectangleBorder
            title="Horas Disponíveis"
            onPress={() => { }}
          />
        </ContainerButtonHoursAvailable>
        <ContainerButtonServices>
          <ButtonRectangleBorder
            title="Serviços"
            onPress={() => { }}
          />
        </ContainerButtonServices>
      </Body>
    </Container>
  );
}
