import {
  Body,
  Container,
  ContainerButtonService,
  Header,
  ListServices,
  Title,
} from "./styles";
import { useProvider } from "../../../../../context/provider/provider.context";
import Loading from "../../../../../components/loading";
import { useEffect, useRef } from "react";
import ButtonButtonSlide from "../../../../../components/button-slide";
import { Animated, PanResponder, StyleSheet, Text, View } from "react-native";


interface FormData {
  name: string;
  duration: number;
  description: string;
  amount: number;
}

export default function Services() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  const { getServices, isProviderLoading, services } = useProvider()

  useEffect(() => {
    getServices({})
  }, [])

  if (isProviderLoading) {
    return <Loading />
  }

  return (
    <Container>
      <Header>
        <Title>Serviços cadastrados</Title>
      </Header>
      <Body>
        <ListServices
          data={services.results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
          (<ContainerButtonService>
            <ButtonButtonSlide
              title="any"
              onPress={() => { }}
            />
            {/* <View style={styles.container}>
              <Text style={styles.titleText}>Drag & Release this box!</Text>
              <Animated.View
                style={{
                  transform: [{ translateX: pan.x }, { translateY: pan.y }],
                }}
                {...panResponder.panHandlers}>
                <View style={styles.box} />
              </Animated.View>
            </View> */}
          </ContainerButtonService>)
          } />
      </Body>
    </Container >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
