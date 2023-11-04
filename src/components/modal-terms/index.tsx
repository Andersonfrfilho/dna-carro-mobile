import {
  Container,
  ContainerBody,
  ContainerButton,
  ContainerFooter,
  ContainerForm,
  ContainerHeader,
  ContainerModal,
  ContainerTitle,
  Phrase,
  Title,
} from "./styles";
import ButtonRectangleBorder from "../button-rectangle";

interface ParamsDto {
  onClosed: () => void;
  show: boolean;
  term: string;
  onConfirm: () => void;
}
export default function ModalTerms({
  show, term, onConfirm
}: ParamsDto) {
  return (
    <ContainerModal visible={show}>
      <Container>
        <ContainerHeader>
          {/* <ContainerToolbar>
            <ContainerIconClosed onPress={onClosed}>
              <IconClosed name={"close-thick"} />
            </ContainerIconClosed>
          </ContainerToolbar> */}
          <ContainerTitle>
            <Title>Termos de uso</Title>
          </ContainerTitle>
        </ContainerHeader>
        <ContainerBody>
          <ContainerForm>
            <Phrase>
              {term}
            </Phrase>
          </ContainerForm>
        </ContainerBody>
        <ContainerFooter>
          <ContainerButton>
            <ButtonRectangleBorder
              title="Aceitar"
              onPress={onConfirm}
            />
          </ContainerButton>
        </ContainerFooter>
      </Container>
    </ContainerModal>
  );
}
