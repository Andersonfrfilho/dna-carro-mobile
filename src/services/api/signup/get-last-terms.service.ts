import { api } from "../provider.service";

interface ResponseDto {
  id: string;
  version: string;
  description: {
    text: string;
  };
  active: boolean;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}
export async function getLastTermService(): Promise<ResponseDto> {
  try {
    const { data } = await api.get<ResponseDto>(`/term/last`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
