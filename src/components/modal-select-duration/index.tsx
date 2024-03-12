import {
  ButtonSelectDurationTouchable,
  ButtonSelectTitleDuration,
  Container,
  ContainerBody,
  ContainerButtonClosed,
  ContainerButtonSelectDuration,
  ContainerHeader,
  ContainerModal,
  ContainerSecondBorder,
  ContainerThirdBorder,
  ContainerTitle,
  DurationList,
  IconClosed,
  Phrase,
} from "./styles";
import { DURATION_VALUES, DurationValue } from "../../constants/date";
import ButtonRectangleBorder from "../button-rectangle";
import { useTheme } from "styled-components/native";
import { TouchableHighlightProps } from "react-native";



interface OnSelectParamsDto extends DurationValue { }

interface ParamsDto {
  readonly onClosed: () => void;
  readonly show: boolean;
  readonly onSelect: (params: OnSelectParamsDto) => void;
}
export function ModalSelectDuration({
  onClosed, show, onSelect
}: ParamsDto) {
  return (
    <ContainerModal visible={show} transparent>
      <Container>
        <ContainerHeader>
          <ContainerTitle>
            <Phrase>Selecione o tempo de duração</Phrase>
          </ContainerTitle>
          <ContainerButtonClosed onPress={onClosed}>
            <IconClosed
              name={"close-thick"}
            />
          </ContainerButtonClosed>
        </ContainerHeader>
        <ContainerBody>
          <DurationList
            data={DURATION_VALUES}
            renderItem={({ item }) => (
              <ContainerButtonSelectDuration>
                <ButtonRectangleBorder
                  title={item.label}
                  onPress={() => {
                    onSelect(item)
                    onClosed()
                  }}
                />
              </ContainerButtonSelectDuration>)
            }
            keyExtractor={(item) => item.label}
          />

        </ContainerBody>
      </Container>
    </ContainerModal>
  );
}

interface ButtonSelectDurationProps extends TouchableHighlightProps {
  readonly title: string;
  readonly select: boolean;
  readonly error?: string;
}

export function ButtonSelectDuration({ title, select, ...props }: ButtonSelectDurationProps) {
  const theme = useTheme();

  return (
    <ButtonSelectDurationTouchable {...props} style={theme.shadow} error={!!props.error} select={select}>
      <ContainerSecondBorder select={select}>
        <ContainerThirdBorder style={theme.shadow} select={select}>
          <ButtonSelectTitleDuration error={!!props.error} select={select}>{title}</ButtonSelectTitleDuration>
        </ContainerThirdBorder>
      </ContainerSecondBorder>
    </ButtonSelectDurationTouchable>
  );
}