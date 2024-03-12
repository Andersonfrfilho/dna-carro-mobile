import { useEffect, useState } from "react";
import {
  Body,
  Container,
  ContainerButtonDayAvailable,
  ContainerConfirmButtonContainer,
  ContainerSubTitle,
  DayAvailableTitle,
  DaysAvailableList,
  Header,
  SubTitle,
  Title,
} from "./styles";
import { useTheme } from "styled-components/native";
import ButtonRectangleBorder from "../../../../../../../components/button-rectangle";
import { useProvider } from "../../../../../../../context/provider/provider.context";
import Loading from "../../../../../../../components/loading";
import { getHoursByPeriodFifteenMinutes } from "../../../../../../../utils/getHourByPeriod";

export default function RegistersHoursAvailable() {
  const { hoursAvailable, setHoursAvailable, getAvailabilitiesHoursByProvider, setAvailabilitiesHoursByProvider, isProviderLoading } = useProvider()

  const theme = useTheme();

  const [firstTime, setFirstTime] = useState('')
  const [lastTime, setLastTime] = useState('')

  useEffect(() => {
    (async () => await getAvailabilitiesHoursByProvider())()
    setFirstTime('')
    setLastTime('')
  }, [])

  async function handleSendAvailableHours() {
    await setAvailabilitiesHoursByProvider(hoursAvailable)
  }

  function handleSelectItem(hour: string) {
    const isAlreadySelectedHour = hoursAvailable.some(item => item.hour === hour && item.selected);
    if (isAlreadySelectedHour) {
      if (hour === firstTime || (firstTime === '' && lastTime === '')) {
        setFirstTime((value) => value === hour ? '' : hour)
        const newFormattedHoursAvailable = hoursAvailable.map(hourParam => {
          if (hourParam.hour === hour) {
            return {
              ...hourParam,
              selected: false,
            }
          }
          return hourParam
        })
        setHoursAvailable(newFormattedHoursAvailable)
      } else if (firstTime !== '' && lastTime === '') {
        const newList = getHoursByPeriodFifteenMinutes({ start: firstTime, end: hour, items: hoursAvailable, selected: false })
        setHoursAvailable(newList)
        setLastTime('')
        setFirstTime('')
      }
    } else {
      if (hour === firstTime || (firstTime === '' && lastTime === '')) {
        setFirstTime((value) => value === hour ? '' : hour)
        const newFormattedHoursAvailable = hoursAvailable.map(hourParam => {
          if (hourParam.hour === hour) {
            return {
              ...hourParam,
              selected: !hourParam.selected,
            }
          }
          return hourParam
        })
        setHoursAvailable(newFormattedHoursAvailable)
      } else if (firstTime !== '' && lastTime === '') {
        const newList = getHoursByPeriodFifteenMinutes({ start: firstTime, end: hour, items: hoursAvailable, selected: true })
        setHoursAvailable(newList)
        setLastTime('')
        setFirstTime('')
      }
    }
  }

  if (isProviderLoading) {
    return <Loading />
  }

  return (
    <Container>
      <Header>
        <Title>Selecione seus horários disponíveis</Title>
        <ContainerSubTitle>
          {firstTime && <SubTitle>Inicio: {firstTime}</SubTitle>}
        </ContainerSubTitle>
      </Header>
      <Body>
        <DaysAvailableList
          data={hoursAvailable}
          numColumns={4}
          key={"_"}
          renderItem={({ item }) =>
            <ContainerButtonDayAvailable style={theme.shadow} firstTime={firstTime === item.hour} disabled={firstTime === item.hour} lastTime={lastTime === item.hour} onPress={() => handleSelectItem(item.hour)} selected={item.selected}>
              <DayAvailableTitle selected={item.selected}>{item.hour}</DayAvailableTitle>
            </ContainerButtonDayAvailable>
          }
        />
        <ContainerConfirmButtonContainer>
          <ButtonRectangleBorder
            title="Salvar"
            onPress={handleSendAvailableHours}
          />
        </ContainerConfirmButtonContainer>
      </Body>
    </Container >
  );
}
