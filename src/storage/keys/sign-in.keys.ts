export interface SignInAuthTokenStorageSecurityKey {
  expireIn: string;
  token: string;
}

export const SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY = "signin.auth.token";

export interface SignInAuthTokenStorageSecurityKey {
  expireInRefreshToken: string;
  refreshToken: string;
}

export const SIGN_IN_AUTH_REFRESH_TOKEN_STORAGE_SECURITY_KEY =
  "signin.auth.refresh-token";

export interface SignInAuthRememberUserStorageSecurityKeyDto {
  user: string;
  userType: string;
}

export const SIGN_IN_REMEMBER_USER_STORAGE_SECURITY_KEY =
  "signin.remember.user";
