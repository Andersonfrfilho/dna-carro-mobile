import { Pagination } from "../../../modules/common/common.interface";
import { apiAuth } from "../provider-auth.service";
import { ServiceParamsPagination } from "./providers.interface";

export interface GetServicesServiceParamsDto extends ServiceParamsPagination {}

export interface Service {
  id: string;
  providerId: string;
  name: string;
  amount: number;
  duration: number;
  details: Details;
  active: boolean;
}

export interface Details {
  description: string;
}

export interface GetServicesProviderServiceResultDto
  extends Pagination<Service> {}

export async function getServicesProviderService(
  params: GetServicesServiceParamsDto
): Promise<GetServicesProviderServiceResultDto> {
  try {
    const { data } = await apiAuth.get<GetServicesProviderServiceResultDto>(
      `/user/provider/services`,
      {
        // params,
        headers: {
          "Content-Type": "application/json;",
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
