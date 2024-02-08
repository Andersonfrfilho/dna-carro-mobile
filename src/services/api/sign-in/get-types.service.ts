import { apiAuth } from "../provider-auth.service";

export interface GetUserTypesServiceResultDto {
  id: string;
  name: string;
  lastName: string;
  document: string;
  documentType: string;
  email: string;
  gender: string;
  details: any;
  birthDate: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  userTypesUsers: UserTypesUser[];
}

export interface UserTypesUser {
  id: string;
  userId: string;
  userTypeId: number;
  roles: any[];
  permissions: any[];
  confirm: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: any;
  deletedAt: any;
}

export async function getUserTypesService(): Promise<GetUserTypesServiceResultDto> {
  try {
    const { data } = await apiAuth.get<GetUserTypesServiceResultDto>(
      `/users/types`,
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
