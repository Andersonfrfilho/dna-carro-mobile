import { api } from "../provider.service";

export interface RefreshTokenToNewSessionServiceParamsDto {
  refreshToken: string;
}

export interface RefreshTokenToNewSessionServiceResultDto {
  token: string;
  refreshToken: string;
  expireIn: number;
  expireInRefreshToken: number;
}

export async function refreshTokenToNewSessionProviderService(
  params: RefreshTokenToNewSessionServiceParamsDto
): Promise<RefreshTokenToNewSessionServiceResultDto> {
  try {
    const { data } = await api.post<RefreshTokenToNewSessionServiceResultDto>(
      `/auth/session/refresh-token`,
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
