export interface UserInfoCacheUser {
  name: string;
  lastName: string;
  document: string;
  documentType: string;
  email: string;
  gender: string;
  details?: any;
  birthDate: string;
  password: string;
}

interface Term {
  id: string;
  accept: boolean;
}
export interface CreateUserInfoCacheContextParamsDto {
  user: UserInfoCacheUser;
  phone: string;
  term: Term;
}
export interface CreateUserInfoCachePhoneContextParamsDto {
  phone: string;
}

export interface PhoneVerifyCodeConfirmationCreateClientParamsDto {
  phone: string;
  code: string;
}

export interface CreateUserInfoCacheContextParamsDto {
  user: UserInfoCacheUser;
  phone: string;
  term: Term;
}

export interface GetTermsResponseDto {
  id: string;
  version: string;
  text: string;
}

export type AddressFindGeocodingReverseParamsDto = {
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
export type AddressFindGeocodingReverseResult = {
  components: ComponentAddress;
  formattedAddress: string;
  placeId: string;
  latitude: string;
  longitude: string;
};

export interface CreateUserAddressInfoCacheUser {
  street: string;
  number: string;
  zipcode: string;
  district: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  complement: string;
  reference: string;
  details: any;
}

export interface CreateUserAddressInfoCacheContextParamsDto {
  address: CreateUserAddressInfoCacheUser;
  phone: string;
}

export interface CreateUserImage {
  base64: string;
}

export interface CreateUserImageInfoCacheContextParamsDto {
  image: CreateUserImage;
  phone: string;
}

export interface CreateUserInfoCacheContextPropsDto {
  confirmPassword: string;
  document: string;
  documentType: string;
  email: string;
  lastName: string;
  name: string;
  password: string;
}
