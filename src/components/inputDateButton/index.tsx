import { Platform, TextInputProps } from 'react-native';
import { ButtonIcon, Container, ContainerBorder, ContainerButtonIcon, ContainerInput, ContainerLabel, ContainerSecondBorder, Icon, InputComponent, Label } from './styles';
import { useTheme } from 'styled-components/native';
import { RefCallBack } from 'react-hook-form';
import { useState } from 'react';
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { DATE_TYPE_MODE_PICKER } from '../../constants/date';

interface Props extends TextInputProps {
  readonly error?: string;
  readonly referenceInput?: RefCallBack;
  readonly inputEditable?: boolean;
  readonly visibleValue?: boolean;
  readonly mode?: DATE_TYPE_MODE_PICKER;
  readonly datePickerValue?: Date;
  readonly onChangeDatePicker?: React.Dispatch<React.SetStateAction<Date>>;
}

enum DatePickerNativeEventType {
  set = 'set',
  dismissed = 'dismissed'
}


export default function InputDateButton({ error,
  referenceInput,
  inputEditable,
  mode,
  onChangeDatePicker,
  datePickerValue,
  ...props }: Props) {
  const theme = useTheme()
  const [isVisibleDatePicker, setIsVisibleDatePicker] = useState(false)

  function handleSetDateToCalendar(event: DateTimePickerEvent, dateParam: Date) {
    if (event?.nativeEvent?.timestamp && event?.type === DatePickerNativeEventType.set) {
      onChangeDatePicker(dateParam)
    }

    setIsVisibleDatePicker(false)
  }

  function handleOpenToCalendar() {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({ value: datePickerValue })
    }
    setIsVisibleDatePicker(true)
  }

  function onCancelDate() {
    setIsVisibleDatePicker(false)
  }

  return (
    <Container>
      {isVisibleDatePicker ? (
        <DateTimePicker
          value={datePickerValue}
          mode={mode}
          onChange={(item, dateParam) => handleSetDateToCalendar(item, dateParam)}
          onTouchCancel={() => onCancelDate()}
        />
      ) : null}
      <ContainerLabel>
        <Label>{error ?? ''}</Label>
      </ContainerLabel>
      <ContainerBorder style={theme.shadow} error={error}>
        <ContainerSecondBorder error={error}>
          <ContainerInput style={theme.shadow} error={error}>
            <InputComponent
              {...props}
              ref={referenceInput}
              error={error}
              editable={inputEditable}
            />
          </ContainerInput>
          <ContainerButtonIcon style={theme.shadow} error={error}>
            <ButtonIcon
              onPress={() => handleOpenToCalendar()}
            >
              <Icon
                name={"calendar-range"}
                error={error}
              />
            </ButtonIcon>
          </ContainerButtonIcon>
        </ContainerSecondBorder>
      </ContainerBorder>
    </Container>
  );
}