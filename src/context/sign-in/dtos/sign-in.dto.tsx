import { GetUserTypesServiceResultDto } from "../../../services/api/sign-in/get-types.service";

export interface CreateSessionParamsDto {
  user: string;
  userType: string;
  password: string;
  isRememberMe: boolean;
}
export interface GetUsersTypesResultDto extends GetUserTypesServiceResultDto { }

export interface UserTypesResultDto extends GetUserTypesServiceResultDto { }

export interface UserTypesDto extends GetUserTypesServiceResultDto { }

export interface VerifyUserProviderTypeParamsDto extends GetUserTypesServiceResultDto { }