import { useRouter } from 'expo-router';
import { ButtonSignIn, ButtonSignUp, Container, ContainerBody, ContainerHeader, ContainerImage, ContainerSignIn, ContainerSignUp, ContainerTitle, LogoImage, Phrase, Title, TitleButton } from './styles';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function Initial() {
  const logoAnimated = useRef(new Animated.Value(0)).current;
  const initialInputRangeLogo = useRef(0).current;
  const finallyInputRangeLogo = useRef(100).current;
  const lengthSequence = useRef(10).current;
  const sequenceInitialFinallyValuesLogo = useRef(new Array(lengthSequence).fill(initialInputRangeLogo).map((element, index) => (element + index) * lengthSequence)).current
  const sequenceOutputRangesOpacityLogo = useRef([0, 1]).current
  const sequenceOutputRangesScaleLogo = useRef([0, 1]).current
  const sequenceOutputRangesRotateLogo = useRef(['0deg', '2deg', '4deg', '2deg', '0deg', '-2deg', '-4deg', '-6deg', '-4deg', '-2deg', '0deg']).current
  const animationLogo = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(logoAnimated, {
      toValue: finallyInputRangeLogo,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animationLogo()
  }, [])
  const router = useRouter();

  const handleSignIn = () => {
    router.push('sign-in')
  }

  const handleSignUp = () => {
    router.push('sign-up')
  }

  const animatedOpacityLogo = {
    opacity: logoAnimated.interpolate({
      inputRange: [initialInputRangeLogo, finallyInputRangeLogo],
      outputRange: sequenceOutputRangesOpacityLogo,

    }),
  }
  const animatedTransformScaleLogo = {
    scale: logoAnimated.interpolate({
      inputRange: [initialInputRangeLogo, finallyInputRangeLogo],
      outputRange: sequenceOutputRangesScaleLogo,

    }),
  }
  const animatedTransformRotateLogo = {
    rotate: logoAnimated.interpolate({
      inputRange: [...sequenceInitialFinallyValuesLogo, finallyInputRangeLogo],
      outputRange: sequenceOutputRangesRotateLogo,

    })
  }

  const animatedTransformLogo = {
    transform: [animatedTransformScaleLogo, animatedTransformRotateLogo]
  }
  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Dna do carro</Title>
          <Phrase>{`Agende facilmente, \n     deixe seu carro brilhar!`}</Phrase>
        </ContainerTitle>
        <ContainerImage
          style={[
            animatedOpacityLogo,
            animatedTransformLogo]}
        >
          <LogoImage
            source={require('../../assets/images/logo.svg')}
          />
        </ContainerImage>
      </ContainerHeader>
      <ContainerBody>
        <ContainerSignIn

        >
          <ButtonSignIn
            onPress={handleSignIn}
            style={{
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
            }}
          >
            <TitleButton>Login</TitleButton>
          </ButtonSignIn>
        </ContainerSignIn>
        <ContainerSignUp

        >
          <ButtonSignUp
            onPress={handleSignUp}
            style={{
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
            }}
          >

            <TitleButton>Cadastro</TitleButton>
          </ButtonSignUp>
        </ContainerSignUp>
      </ContainerBody>
    </Container >
  );
}