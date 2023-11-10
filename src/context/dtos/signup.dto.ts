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

export interface GetTermsResponseDto {
  id: string;
  version: string;
  text: string;
}
