import { ContainerTitle, Phrase, Title } from "../styles";
import {
  ComponentCamera,
  ComponentImage,
  Container,
  ContainerBody,
  ContainerButton,
  ContainerButtons,
  ContainerHeader,
  ContainerImage,
} from "./styles";
import { useSignUp } from "../../../context/signup.context";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useState } from "react";
import ButtonCircleIconBorder from "../../../components/button-circle-icon";
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from "expo-router";
import { IMAGE_DEFAULT_PROFILE } from "../../../assets/images/base64/default-profile";

interface ParamsDto {
  latitude: number;
  longitude: number;
}

type PropsRouteParams = {
  phone: string;
}
let camera: Camera
export default function SignUpAddress() {
  const params = useLocalSearchParams<PropsRouteParams>();
  const { createUserInfoCacheImage } = useSignUp();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [image, setImage] = useState('');

  if (!permission) {
    requestPermission();
  }

  if (!permission?.granted) {
    requestPermission();
  }

  function handleFlashMode() {
    setFlashMode(current =>
      current === FlashMode.on ? FlashMode.off : FlashMode.on
    );
  }

  function handleCameraType() {
    setCameraType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function handleGivePickerImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }
  }

  async function handleRemoveImage() {
    setImage('');
  }

  async function handleSendImage() {
    await createUserInfoCacheImage({
      image: { base64: image },
      phone: params.phone,
    })
  }
  async function handleSendDefaultImage() {
    await createUserInfoCacheImage({
      image: { base64: IMAGE_DEFAULT_PROFILE },
      phone: params.phone,
    })
  }
  async function handleTakePicture() {
    if (camera) {
      const { base64 } = await camera.takePictureAsync();
      setImage(base64);
    }
  }
  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Title>Adicione uma imagem</Title>
          <Phrase>{`Tire ou envie uma foto, \n     Selecione uma imagem!`}</Phrase>
        </ContainerTitle>
      </ContainerHeader>
      <ContainerBody>
        {image ? (
          <ContainerImage>
            <ComponentImage source={{ uri: `data:image/png;base64,${image}` }} />
            <ContainerButtons>
              <ContainerButton>
                <ButtonCircleIconBorder
                  iconName={"trash-can"}
                  onPress={handleRemoveImage}
                />
              </ContainerButton>
              <ContainerButton>
                <ButtonCircleIconBorder
                  iconName={"send"}
                  onPress={handleSendImage}
                />
              </ContainerButton>
            </ContainerButtons>
          </ContainerImage>
        ) : (<ComponentCamera type={cameraType} ref={(r) => {
          camera = r
        }}>
          <ContainerButtons>
            <ContainerButton>
              <ButtonCircleIconBorder
                iconName={flashMode === FlashMode.on ? "flash-off" : "flash"} // flash-off
                onPress={handleFlashMode}
              />
            </ContainerButton>
            <ContainerButton>
              <ButtonCircleIconBorder
                iconName={cameraType === CameraType.back ? "camera-front" : "camera-rear"} // camera-front
                onPress={handleCameraType}
              />
            </ContainerButton>
          </ContainerButtons>
          <ContainerButtons>
            <ContainerButton>
              <ButtonCircleIconBorder
                iconName={"camera"}
                onPress={handleTakePicture}
              />
            </ContainerButton>
            <ContainerButton>
              <ButtonCircleIconBorder
                iconName={"folder-open"}
                onPress={handleGivePickerImage}
              />
            </ContainerButton>
            <ContainerButton>
              <ButtonCircleIconBorder
                iconName={"step-forward"}
                onPress={handleSendDefaultImage}
              />
            </ContainerButton>
          </ContainerButtons>
        </ComponentCamera>)}
      </ContainerBody >
    </Container >
  );
}

