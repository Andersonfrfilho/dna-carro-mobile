export interface CreateSessionParamsDto {
  user: string;
  userType: string;
  password: string;
  isRememberMe: boolean;
}