import { DocumentsTypeEnum, GendersTypeEnum } from "../enums/account.enum";
import { api } from "../provider.service";

export interface CreateUserInfoCacheUser {
  name: string;
  lastName: string;
  document: string;
  documentType: DocumentsTypeEnum;
  email: string;
  gender: GendersTypeEnum;
  details: any;
  birthDate: number;
  password: string;
}

export interface PhoneUserInfoCacheUser {
  countryCode: string;
  ddd: string;
  number: string;
}

export interface CreateUserInfoCacheServicePropsDto {
  user: CreateUserInfoCacheUser;
  phone: PhoneUserInfoCacheUser;
}

export async function createUserInfoCacheService(
  params: CreateUserInfoCacheServicePropsDto
): Promise<void> {
  try {
    await api.post(`/user/client/cache/user`, params, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    throw error;
  }
}
