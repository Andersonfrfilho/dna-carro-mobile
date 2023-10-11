import { api } from "../provider.service";

export interface CreateUserInfoCacheServicePropsDto {
  user: {
    name: string;
    lastName: string;
    document: string;
    documentType: string;
    email: string;
    gender: string;
    details: any;
    birthDate: number;
    password: string;
  };
}
export async function createUserInfoCache(
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
