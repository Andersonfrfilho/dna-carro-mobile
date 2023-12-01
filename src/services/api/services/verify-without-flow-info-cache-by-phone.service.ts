import { NameCacheKeyFlow } from "../enums/account.enum";
import { api } from "../provider.service";

interface ServiceGetResponse {
  missingCacheInfo: Array<NameCacheKeyFlow>;
}
export async function verifyWithoutFlowInfoCacheByPhoneService(
  phone: string
): Promise<ServiceGetResponse> {
  try {
    const { data } = await api.get<ServiceGetResponse>(
      `/user/client/cache/phones/${phone}/without/flow`,
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
