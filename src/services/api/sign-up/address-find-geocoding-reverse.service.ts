import { api } from "../provider.service";

type ParamsDto = {
  latitude: string;
  longitude: string;
};
interface ComponentAddress {
  street: string;
  neighborhood: string;
  postalCode: string;
  city: string;
  state: string;
  number: string;
  country: string;
}
export type ServiceResponse = {
  components: ComponentAddress;
  formattedAddress: string;
  placeId: string;
  latitude: string;
  longitude: string;
};
export async function addressFindGeocodingReverseService({
  latitude,
  longitude,
}: ParamsDto): Promise<ServiceResponse> {
  const body = {
    latitude,
    longitude,
  };
  try {
    const { data } = await api.post<ServiceResponse>(
      "/address/find/geocoding/reverse",
      body,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}
