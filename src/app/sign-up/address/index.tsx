import {
  Container,
  ContainerBody,
  ContainerForm,
  ContainerHeader,
  ContainerTitle,
  Phrase,
  Title,
  ContainerMapView,
  ContainerInputLocation,
  ComponentMapView,
  ContainerButtons,
  ContainerEditableButton,
  ContainerConfirmButton,
  LabelAddressDescription,
  ContainerLabelDescription,
  ContainerSecondBorder,
  ContainerBorder,
} from "./styles";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from "react";
import { useSignUp } from "../../../context/signup.context";
import ModalAddressConfirmation from "../../../components/modal-address-confirmation";
import { CreateUserAddressInfoCacheContextParamsDto } from "../../../context/dtos/signup.dto";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "styled-components/native";
import ButtonCircleIconBorder from "../../../components/button-circle-icon";

interface ParamsDto {
  latitude: number;
  longitude: number;
}

export interface FormDataParamsDto {
  street: string;
  number: string;
  neighborhood: string;
  state: string;
  postalCode: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  details: any;
}
type PropsRouteParams = {
  phone: string;
}

export default function SignUpAddress() {
  const theme = useTheme()
  const { addressFindGeocodingReverse, createUserInfoCacheAddress } = useSignUp();

  const params = useLocalSearchParams<PropsRouteParams>();
  const [location, setLocation] = useState<Location.LocationObject>({ "coords": { "accuracy": 899.9990234375, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 37.4226711, "longitude": -122.0849872, "speed": 0 }, "mocked": false, "timestamp": 1700106135892 });
  const [errorMsg, setErrorMsg] = useState(null);
  const [componentAddress, setComponentAddress] = useState<FormDataParamsDto>({
    street: '',
    city: '',
    details: {
      formattedAddress: '',
      placeId: '',
    },
    latitude: '',
    longitude: '',
    state: '',
    postalCode: '',
    country: '',
    number: '',
    neighborhood: '',
  } as FormDataParamsDto);
  const [showModalAddressConfirm, setShowModalAddressConfirm] = useState(false);
  const useRefAutoComplete = useRef(null);
  const [onSelectAddressPlaceAutoComplete, setOnSelectAddressPlaceAutoComplete] = useState(true)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        setLocation(location);
      }
    })();
  }, []);

  useEffect(() => {
    if (!onSelectAddressPlaceAutoComplete && useRefAutoComplete?.current?.focus) {
      useRefAutoComplete.current.focus(() => {
        setOnSelectAddressPlaceAutoComplete(true)
      })
    }
  }, [useRefAutoComplete])

  async function handleSelectAddressByAutoComplete({
    latitude,
    longitude
  }: ParamsDto) {
    setLocation({
      coords: {
        latitude,
        longitude,
        accuracy: 899.9990234375,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0,
      },
      timestamp: new Date().getDate(),
      mocked: false
    })
    const result = await addressFindGeocodingReverse({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    })

    const componentsResult = {
      street: result?.components?.street ?? '',
      city: result?.components?.city ?? '',
      details: {
        formattedAddress: result?.formattedAddress ?? '',
        placeId: result?.placeId ?? '',
      },
      latitude: result?.latitude ?? '',
      longitude: result?.longitude ?? '',
      state: result?.components?.state ?? '',
      postalCode: result?.components?.postalCode ?? '',
      country: result?.components?.country ?? '',
      number: result?.components?.number ?? '',
      neighborhood: result?.components?.neighborhood ?? '',
    }
    setComponentAddress(componentsResult)
    setOnSelectAddressPlaceAutoComplete(false)
  }

  function handleOpenModal() {
    setShowModalAddressConfirm(true)
  }

  function handleCloseModal() {
    setShowModalAddressConfirm(false)
  }
  async function handleAccountAddressPreparedToRegister(data: FormDataParamsDto) {
    const dataToCreateInfoCacheAddress: CreateUserAddressInfoCacheContextParamsDto = {
      address: {
        street: data.street,
        number: data.number,
        district: data.neighborhood,
        city: data.city,
        state: data.state,
        zipcode: data.postalCode,
        latitude: data.latitude,
        longitude: data.longitude,
        details: data.details,
        complement: "",
        reference: ""
      },
      phone: params.phone,
    }
    await createUserInfoCacheAddress(dataToCreateInfoCacheAddress)
  }

  return (
    <Container>
      <ModalAddressConfirmation
        onClosed={handleCloseModal}
        show={showModalAddressConfirm}
        components={componentAddress}
        handleAccountAddressPreparedToRegister={handleAccountAddressPreparedToRegister} />
      <ContainerHeader>
        <ContainerTitle>
          <Title>Digite seu endereço</Title>
          <Phrase>{`Preencha seu endereço, \n     Selecione um local!`}</Phrase>
        </ContainerTitle>
      </ContainerHeader>
      <ContainerBody>
        <ContainerForm selectAddress={onSelectAddressPlaceAutoComplete} onPress={() => setOnSelectAddressPlaceAutoComplete(false)} disabled={onSelectAddressPlaceAutoComplete}>
          <ContainerInputLocation>
            {onSelectAddressPlaceAutoComplete ?
              <GooglePlacesAutocomplete
                ref={useRefAutoComplete}
                placeholder='Endereço'
                textInputHide={!onSelectAddressPlaceAutoComplete}
                textInputProps={{
                  onPressIn(e) {
                    setOnSelectAddressPlaceAutoComplete(true)
                  },
                }}
                onPress={async (data, details = null) => {
                  if (details?.geometry?.location?.lat && details?.geometry?.location?.lng) {
                    await handleSelectAddressByAutoComplete({
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                    })
                  }
                }
                }
                fetchDetails={true}
                query={{
                  key: 'AIzaSyAvGAswSGzD6YNDCgjHHhea7G6JVVimDhQ', // Substitua pelo seu próprio API Key
                  language: 'pt-BR',
                  components: 'country:BR',
                }}
              />
              : componentAddress.details.formattedAddress &&
              <ContainerBorder style={theme.shadow}>
                <ContainerSecondBorder style={theme.shadow}>
                  <ContainerLabelDescription style={theme.shadow}>
                    <LabelAddressDescription>{componentAddress.details.formattedAddress}</LabelAddressDescription>
                  </ContainerLabelDescription>
                </ContainerSecondBorder>
              </ContainerBorder>
            }
          </ContainerInputLocation>
        </ContainerForm>
        <ContainerMapView>
          <ComponentMapView
            provider={"google"}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}

            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            rotateEnabled={false}
            maxZoomLevel={18}
            minZoomLevel={14}
            userLocationPriority={"high"}
            followsUserLocation={true}
            showsMyLocationButton={true}
            showsPointsOfInterest={false}
            onRegionChangeComplete={async (params) => {
              setLocation((location) => {
                return {
                  ...location,
                  coords: {
                    ...location.coords,
                    latitude: params.latitude,
                    longitude: params.longitude,
                  }
                }
              })
              await handleSelectAddressByAutoComplete({
                latitude: params.latitude,
                longitude: params.longitude,
              })
            }
            }
          >
            <Marker
              coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
            />
          </ComponentMapView>
          {!onSelectAddressPlaceAutoComplete && <ContainerButtons>
            <ContainerEditableButton>
              <ButtonCircleIconBorder
                iconName={"pencil"}
                onPress={() => setOnSelectAddressPlaceAutoComplete(true)}
              />
            </ContainerEditableButton>
            <ContainerConfirmButton>
              <ButtonCircleIconBorder
                iconName={"check-bold"}
                onPress={() => handleOpenModal()}
              />
            </ContainerConfirmButton>
          </ContainerButtons>}
        </ContainerMapView>
      </ContainerBody>
    </Container >
  );
}
