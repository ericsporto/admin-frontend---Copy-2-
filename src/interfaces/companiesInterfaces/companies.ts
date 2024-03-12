export type RegisterCompaniesCreadentials = {
  business_name: string;
  trading_name: string;
  official_id_type: string;
};

//Companies Dropdown Model
export interface CompaniesDropdownModel {
  id: string;
  business_name: string;
  trading_name: string;
  official_id_number: string;
  official_id_type: string;
  pivot: Pivot;
}

export interface Pivot {
  seller_id: string;
  company_id: string;
  role_id: string;
  invited_at: string;
  invite_accepted_at: string;
}

// Company Docs Model
export interface CompanyDocsModel {
  id: string;
  owner_id: string;
  country_id: string;
  country: CompanyDocsCountry;
  business_name: string;
  trading_name: string;
  official_id_number: string;
  official_id_type: string;
  risk_level: string;
  kyb_status: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  files: CompanyDocsFile[];
}

export interface CompanyDocsCountry {
  id: string;
  name: string;
  alpha_2_code: string;
  alpha_3_code: string;
  calling_code: string;
  currency_id: string;
  locale_id: string;
  timezone_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  flag: string;
}

export interface CompanyDocsFile {
  id: string;
  owner_type: string;
  owner_id: string;
  target_type: string;
  target_id: string;
  name: string;
  original_name: string;
  description: any;
  path: string;
  mime_type: string;
  tags: string[];
  size: number;
  is_private: boolean;
  created_at: string;
  updated_at: string;
  extension: string;
  size_for_humans: string;
}

//Company Tax Model
export interface CompanyTaxModel {
  id: string;
  company_id: string;
  pix_fixed_fee: string;
  pix_variable_fee: string;
  bank_slip_fixed_fee: string;
  bank_slip_variable_fee: string;
  credit_card_fixed_fee: string;
  credit_card_variable_fee: string;
  credit_card_installment_fees: CreditCardInstallmentFees[];
  created_at: string;
  updated_at: string;
}

export interface CreditCardInstallmentFees {
  installment: number;
  value: number;
}


//Create Company Response Model
export interface CreateCompanyResponseModel {
  business_name: string
  trading_name: string
  official_id_number: string
  official_id_type: string
  country_id: string
  id: string
  owner_id: string
  updated_at: string
  created_at: string
}
