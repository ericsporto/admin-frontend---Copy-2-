export type RegisterStoresCreadentials = {
  name: string;
  support_email: string;
  support_phone: string;
};

// Stores List Model
export interface StoresListModel {
  current_page: number;
  data: StoresList[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface StoresList {
  id: string;
  company_id: string;
  name: string;
  support_email: string;
  support_phone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  seller_id: string;
  store_id: string;
  role_id: string;
  invited_at: string;
  invite_accepted_at: string;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

// Store By Id Model
export interface StoreByIdModel {
  id: string;
  company_id: string;
  name: string;
  support_email: string;
  support_phone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sellers: StoreByIdSeller[];
}

export interface StoreByIdSeller {
  id: string;
  name: string;
  email: string;
  avatar: any;
  locale_id: string;
  is_active: boolean;
  kyc_status: string;
  risk_level: string;
  email_verified_at: any;
  created_at: string;
  updated_at: string;
  pivot: StoreByIdPivot;
}

export interface StoreByIdPivot {
  store_id: string;
  seller_id: string;
  role_id: string;
  invited_at: string;
  invite_accepted_at: string;
}

export interface StoreDropdownModel {
  id: string;
  company_id: string;
  is_active: boolean;
  name: string;
  support_email: string;
  support_phone: string;
  update_at: string;
  created_at: string;
}
