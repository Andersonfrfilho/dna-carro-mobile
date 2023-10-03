import { TextInputProps } from 'react-native';
import { Container, ContainerOption, ButtonBorder, ButtonTitle, ContainerHeader, ContainerBody, List, ContainerButtonClosed, Icon, ContainerInputIconSearch, ContainerInputSearch, ContainerIconSearch, InputSearch, ButtonIcon } from './styles';
import { useTheme } from 'styled-components/native';
import { RefCallBack } from 'react-hook-form';
import { Button } from '../button/styles';

interface DataProps {
  label: string;
  value: string;
}

interface Props extends TextInputProps {
  error?: string;
  reference?: RefCallBack;
  title: string;
  data: Array<DataProps>;
}

export default function SearchItems({ error, reference, title, data, ...props }: Props) {
  const theme = useTheme()

  return (
    <Container>
      <ContainerHeader>
        <ContainerButtonClosed>
          <ButtonIcon>
            <Icon
              name="close-thick"
            />
          </ButtonIcon>
        </ContainerButtonClosed>
        <ContainerInputIconSearch>
          <ContainerInputSearch>
            <InputSearch
              placeholder='magnify'
            />
          </ContainerInputSearch>
          <ContainerIconSearch>
            <Icon name="magnify" style={{ transform: [{ rotateY: '180deg' }] }} />
          </ContainerIconSearch>
        </ContainerInputIconSearch>
      </ContainerHeader>
      <ContainerBody>
        <List
          data={data}
          renderItem={() => (
            <ContainerOption>
              <ButtonBorder>
                <Button>
                  <ButtonTitle>Select-1</ButtonTitle>
                </Button>
              </ButtonBorder>
            </ContainerOption>
          )}
        />
      </ContainerBody>
    </Container>
  );
}