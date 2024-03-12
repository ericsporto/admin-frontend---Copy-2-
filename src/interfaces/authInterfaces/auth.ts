export type LoginCreadentials = {
  email: string;
  password: string;
};

export type RegisterCreadentials = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  official_id_number: string;
  official_id_type: string;
};

export type ForgotCreadentials = {
  email: string;
};

export type ResetCreadentials = {
  email: string;
  token: string;
  password: string;
};

export type ChangePasswordCreadentials = {
  password: string;
  confirmPassword: string;
};

//Token Model
export interface TokenModel {
  token: string;
}

// User Model
export interface UserModel {
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: any;
  locale_id: string;
  is_active: boolean;
  kyc_status: string;
  risk_level: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  locale: Locale;
  has_company: boolean;
}

export interface Locale {
  id: string;
  name: string;
  code: string;
  is_active: number;
  is_default: number;
  is_localized: number;
  created_at: string;
  updated_at: string;
}

//Check OTP Model
export interface CheckOtpModel {
  enabled: boolean;
  type: string;
  validated: boolean;
}
