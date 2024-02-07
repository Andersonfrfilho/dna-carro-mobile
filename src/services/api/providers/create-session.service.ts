import { api } from "../provider.service";

export interface CreateSessionServiceParamsDto {
  user: string;
  userType: string;
  password: string;
}

export interface CreateSessionServiceResultDto {
  token: string;
  refreshToken: string;
  expireIn: number;
  expireInRefreshToken: number;
}

export async function createSessionService({
  userType,
  ...params
}: CreateSessionServiceParamsDto): Promise<CreateSessionServiceResultDto> {
  try {
    const { data } = await api.post<CreateSessionServiceResultDto>(
      `/auth/session/${userType}`,
      params,
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
