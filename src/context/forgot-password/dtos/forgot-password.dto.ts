export interface PhoneVerifyCodeConfirmationForgotPasswordClientParamsDto {
  phone: string;
  code: string;
}

export interface ForgotPasswordResetPasswordParamsDto {
  phone: string;
  password: string;
  code: string;
}
