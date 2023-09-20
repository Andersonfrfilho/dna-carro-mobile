import { api } from "../provider.service";

interface ServiceGetResponse {
  missingCacheInfo: Array<string>;
}
export async function verifyWithoutFlowInfoCache(
  email: string
): Promise<ServiceGetResponse> {
  try {
    const { data } = await api.get<ServiceGetResponse>(
      `/user/client/cache/${email}/without/flow`
    );
    return data;
  } catch (error) {
    throw error;
  }
}
