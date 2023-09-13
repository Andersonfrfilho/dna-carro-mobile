import { useRouter } from 'expo-router';
import { Container, ContainerBody, ContainerHeader, ContainerImage, ContainerLogo, ContainerSignIn, ContainerSignUp, ContainerTitle, LogoImage, Phrase, Title, TitleButton } from './styles';
import { useRef } from 'react';
import { Animated } from 'react-native';

export default function Home() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('sign-in')
  }

  const handleSignUp = () => {
    router.push('sign-in')
  }

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Dna do carro</Title>
          <Phrase>{`Agende facilmente, \n     deixe seu carro brilhar!`}</Phrase>
        </ContainerTitle>
        <ContainerImage>
          <LogoImage
            source={require('../../assets/images/logo.svg')}
          />
        </ContainerImage>
      </ContainerHeader>
      <ContainerBody>
        <ContainerSignIn
          onPress={handleSignIn}
        >
          <TitleButton>Login</TitleButton>
        </ContainerSignIn>
        <ContainerSignUp
          onPress={handleSignUp}
        >
          <TitleButton>Cadastro</TitleButton>
        </ContainerSignUp>
      </ContainerBody>
    </Container>
  );
}