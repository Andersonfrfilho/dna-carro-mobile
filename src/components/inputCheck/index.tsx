import { TextInputProps } from 'react-native';
import { ButtonIcon, Container, ContainerBorder, ContainerButtonIcon, ContainerIcon, ContainerIconTitle, ContainerInput, ContainerLabel, ContainerSecondBorder, ContainerTitle, Icon, IconTitle, InputComponent, Label } from './styles';
import { useTheme } from 'styled-components/native';
import { RefCallBack } from 'react-hook-form';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props extends TextInputProps {
  readonly error?: string;
  readonly referenceInput?: RefCallBack;
  readonly leftIconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  readonly leftIconButtonOnPress: () => void;
  readonly leftIconButtonDisabled: boolean;
  readonly leftIconButtonSelect: boolean;
  readonly leftIconTitle?: string;
  readonly rightIconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  readonly rightIconButtonOnPress: () => void;
  readonly rightIconButtonDisabled: boolean;
  readonly rightIconButtonSelect: boolean;
  readonly rightIconTitle?: string;
  readonly inputEditable?: boolean;
}

export default function InputCheck({ error,
  referenceInput,
  leftIconName = "material-design",
  leftIconButtonOnPress,
  leftIconButtonSelect,
  leftIconButtonDisabled,
  leftIconTitle,
  rightIconName = "material-design",
  rightIconButtonOnPress,
  rightIconButtonSelect,
  rightIconButtonDisabled,
  rightIconTitle,
  inputEditable,
  ...props }: Props) {
  const theme = useTheme()

  return (
    <Container>
      <ContainerLabel>
        <Label>{error ?? ''}</Label>
      </ContainerLabel>
      <ContainerBorder style={theme.shadow} error={error}>
        <ContainerSecondBorder error={error}>
          <ContainerButtonIcon style={theme.shadow} error={error}>
            <ButtonIcon
              onPress={leftIconButtonOnPress}
              select={leftIconButtonSelect}
              disabled={leftIconButtonDisabled}
            >
              <ContainerIconTitle>
                {leftIconName && <ContainerIcon>
                  <Icon
                    name={leftIconName}
                    select={leftIconButtonSelect}
                    error={error}
                  />
                </ContainerIcon>}
                {!!leftIconTitle && <ContainerTitle>
                  <IconTitle
                    select={leftIconButtonSelect}
                    error={error}
                  >{leftIconTitle}
                  </IconTitle>
                </ContainerTitle>}
              </ContainerIconTitle>
            </ButtonIcon>
          </ContainerButtonIcon>
          <ContainerButtonIcon style={theme.shadow} error={error}>
            <ButtonIcon
              onPress={rightIconButtonOnPress}
              select={rightIconButtonSelect}
              disabled={rightIconButtonDisabled}
            >
              <ContainerIconTitle>
                {rightIconName && <ContainerIcon>
                  <Icon
                    name={rightIconName}
                    select={rightIconButtonSelect}
                    error={error}
                  />

                </ContainerIcon>}
                {!!rightIconTitle && <ContainerTitle>
                  <IconTitle error={error} select={rightIconButtonSelect}>{rightIconTitle}</IconTitle>
                </ContainerTitle>}
              </ContainerIconTitle>
            </ButtonIcon>
          </ContainerButtonIcon>
          <ContainerInput style={theme.shadow} error={error}>
            <InputComponent
              {...props}
              ref={referenceInput}
              error={error}
              editable={inputEditable}
            />
          </ContainerInput>
        </ContainerSecondBorder>
      </ContainerBorder>
    </Container>
  );
}