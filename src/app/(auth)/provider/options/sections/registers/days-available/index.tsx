import { useEffect, useState } from "react";
import {
  Body,
  Container,
  ContainerButtonDayAvailable,
  ContainerConfirmButtonContainer,
  DayAvailableTitle,
  DaysAvailableList,
  Header,
  Title,
} from "./styles";
import { useTheme } from "styled-components/native";
import ButtonRectangleBorder from "../../../../../../../components/button-rectangle";
import { useProvider } from "../../../../../../../context/provider/provider.context";
import Loading from "../../../../../../../components/loading";

export default function RegistersDaysAvailable() {
  const { daysAvailable, setDaysAvailable, getAvailableDaysByProvider, setAvailableDaysByProvider, isProviderLoading } = useProvider()

  const theme = useTheme();

  useEffect(() => {
    (async () => await getAvailableDaysByProvider())()
  }, [])

  async function handleSendAvailableDays() {
    await setAvailableDaysByProvider(daysAvailable.filter(day => day.selected))
  }
  function handleSelectItem(id: string) {
    const formattedDaysAvailable = daysAvailable.map(day => {
      if (day.id === id) {
        return {
          ...day,
          selected: !day.selected
        }
      }
      return day
    })
    setDaysAvailable(formattedDaysAvailable)
  }

  if (isProviderLoading) {
    return <Loading />
  }

  return (
    <Container>
      <Header>
        <Title>Selecione os dias disponíveis</Title>
      </Header>
      <Body>
        <DaysAvailableList
          data={daysAvailable}
          renderItem={({ item }) =>
            <ContainerButtonDayAvailable style={theme.shadow} onPress={() => handleSelectItem(item.id)} selected={item.selected}>
              <DayAvailableTitle selected={item.selected}>{item.label}</DayAvailableTitle>
            </ContainerButtonDayAvailable>
          }
        />
        <ContainerConfirmButtonContainer>
          <ButtonRectangleBorder
            title="Salvar"
            onPress={handleSendAvailableDays}
          />
        </ContainerConfirmButtonContainer>
      </Body>
    </Container >
  );
}
