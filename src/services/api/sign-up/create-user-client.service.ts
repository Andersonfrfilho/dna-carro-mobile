import { api } from "../provider.service";
import { PhoneUserInfoCacheUser } from "./create-user-info-cache.service";

export interface UserClientServicePropsDto {
  phone: PhoneUserInfoCacheUser;
}

export async function createUserClientService(
  params: UserClientServicePropsDto
): Promise<void> {
  try {
    await api.post(`/user/client`, params, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    throw error;
  }
}
