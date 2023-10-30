import { ListRenderItemInfo, TextInputProps } from 'react-native';
import { Container, ContainerOption, ButtonBorder, ButtonTitle, ContainerHeader, ContainerBody, List, ContainerButtonClosed, Icon, ContainerInputIconSearch, ContainerInputSearch, ContainerIconSearch, InputSearch, ButtonIcon, Button, ModalContainer } from './styles';
import { useTheme } from 'styled-components/native';
import { RefCallBack } from 'react-hook-form';
import { useState } from 'react';

export interface DataListProps {
  label: string;
  value: string;
  id: string;
}

interface Props extends TextInputProps {
  error?: string;
  reference?: RefCallBack;
  title: string;
  data: Array<DataListProps>;
  onSelectItem: (data: DataListProps) => void;
  visible: boolean;
  onChangeVisible: (data: boolean) => void;
}

export default function SearchItems({ error, reference, onSelectItem, title, data, visible, onChangeVisible, ...props }: Props) {
  const theme = useTheme()
  const [filter, setFilter] = useState<string>('')

  const dataFilter = filter === '' ? data : data.filter(item => {
    return item.label.includes(filter)
  })

  function handleSelectItem(item: DataListProps) {
    onSelectItem(item)
    onChangeVisible(false)
  }

  function handleClosedSelectItem(item: DataListProps) {
    onChangeVisible(false)
  }

  return (
    <ModalContainer visible={visible}>
      <Container>
        <ContainerHeader>
          <ContainerButtonClosed>
            <ButtonIcon onPress={handleClosedSelectItem}>
              <Icon
                size={theme.fontSizeWithoutPixel.title}
                name="close-thick"

              />
            </ButtonIcon>
          </ContainerButtonClosed>
          <ContainerInputIconSearch>
            <ContainerInputSearch>
              <InputSearch
                placeholder='busca'
                onChangeText={setFilter}
              />
            </ContainerInputSearch>
            <ContainerIconSearch>
              <Icon name="magnify" style={{ transform: [{ rotateY: '180deg' }] }} size={theme.fontSizeWithoutPixel.title} />
            </ContainerIconSearch>
          </ContainerInputIconSearch>
        </ContainerHeader>
        <ContainerBody>
          <List
            data={dataFilter}
            renderItem={({ item }: ListRenderItemInfo<DataListProps>) => (
              <ContainerOption>
                <ButtonBorder>
                  <Button onPress={() => handleSelectItem(item)}>
                    <ButtonTitle>{item.label}</ButtonTitle>
                  </Button>
                </ButtonBorder>
              </ContainerOption>
            )}
          />
        </ContainerBody>
      </Container>
    </ModalContainer>

  );
}