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

export interface CreateUserInfoCacheContextParamsDto {
  user: UserInfoCacheUser;
  phone: string;
}

export interface PhoneVerifyCodeConfirmationCreateClientParamsDto {
  phone: string;
  code: string;
}

export interface GetTermsResponseDto {
  id: string;
  version: string;
  text: string;
}
