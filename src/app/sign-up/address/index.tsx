import {
  Container,
  ContainerBody,
  ContainerForm,
  ContainerHeader,
  ContainerInput,
  ContainerTitle,
  Phrase,
  Title,
  ContainerLoading,
  ContainerButtonLocation,
  ContainerMapView,
  ContainerInputLocation,
  Icon,
} from "./styles";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    position: 'absolute',
    zIndex: 10, // Coloque um valor alto para que o formulário de entrada fique na frente do mapa
    top: 0,
    left: 0,
    width: '100%',
    height: 250,
  },
});

// Resto do seu código...

export default function SignUpAccount() {
  // ...

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Digite seu endereço</Title>
          <Phrase>{`Preencha seu endereço, \n     Selecione um local!`}</Phrase>
        </ContainerTitle>
      </ContainerHeader>
      <ContainerBody>
        {/* Contêiner do formulário de entrada (GooglePlacesAutocomplete) */}
        <View style={styles.formContainer}>
          <ContainerForm>
            <ContainerInputLocation>
              <ContainerInput>
                <GooglePlacesAutocomplete
                  placeholder='Search'
                  onPress={(data, details = null) => {
                    //console.log(data, details);
                  }}
                  query={{
                    key: 'AIzaSyAvGAswSGzD6YNDCgjHHhea7G6JVVimDhQ', // Substitua pelo seu próprio API Key
                    language: 'pt-BR',
                  }}
                  styles={{
                    // Seus estilos personalizados para o formulário de entrada
                  }}
                />
              </ContainerInput>
              <ContainerButtonLocation>
                <Icon name={"location-enter"} />
              </ContainerButtonLocation>
            </ContainerInputLocation>
          </ContainerForm>
        </View>
        {/* Contêiner do mapa */}
        <ContainerMapView>
          <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }} />
        </ContainerMapView>
      </ContainerBody>
    </Container>
  );
}
