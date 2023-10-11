import { Container, ContainerImage, ContainerTitle, LogoImage, Title } from './styles';


export default function Logo() {
  return (
    <Container>
      <ContainerImage>
        <LogoImage
          source={require('../../assets/images/logo.svg')}
          contentFit='contain'
        />
      </ContainerImage>
      <ContainerTitle>
        <Title>DNA Carro</Title>
      </ContainerTitle>
    </Container>
  );
}