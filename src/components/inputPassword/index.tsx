import { TextInputProps } from 'react-native';
import { ButtonIcon, Container, ContainerBorder, ContainerButtonIcon, ContainerIcon, ContainerInput, ContainerLabel, ContainerSecondBorder, Icon, InputComponent, Label } from './styles';
import { useTheme } from 'styled-components/native';
import { RefCallBack } from 'react-hook-form';
import { useCallback, useState } from 'react';

interface Props extends TextInputProps {
  error?: string;
  referenceInput?: RefCallBack;
  inputEditable?: boolean;
  visibleValue?: boolean;
}

type IconName = 'eye-outline' | 'eye-off-outline'

export default function InputPassword({ error,
  referenceInput,
  inputEditable,
  ...props }: Props) {
  const theme = useTheme()
  const [secret, setSecret] = useState<boolean>(true)
  const [iconName, setIconName] = useState<IconName>('eye-off-outline')

  const handleVisibleContent = useCallback(() => {
    console.log("#####", iconName, secret)
    if (secret) {
      setSecret(false)
      setIconName('eye-off-outline')
    } else {
      setSecret(true)
      setIconName('eye-outline')
    }

  }, [secret, iconName])
  return (
    <Container>
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
              secureTextEntry={secret}
            />
          </ContainerInput>
          <ContainerButtonIcon style={theme.shadow} error={error}>
            <ButtonIcon
              onPress={handleVisibleContent}
            >
              <Icon
                name={iconName}
              />
            </ButtonIcon>
          </ContainerButtonIcon>
        </ContainerSecondBorder>
      </ContainerBorder>
    </Container>
  );
}