export interface CustomersByCompanyListModel {
  current_page: number;
  data: CustomersByCompanyList[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: CustomersByCompanyListLink[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface CustomersByCompanyList {
  id: string;
  store_id: string;
  name: string;
  email: string;
  official_id_number: string;
  official_id_type: string;
  address_zip_code: any;
  address_city: any;
  address_state: any;
  address_country: any;
  created_at: string;
  updated_at: string;
  laravel_through_key: string;
}

export interface CustomersByCompanyListLink {
  url?: string;
  label: string;
  active: boolean;
}

//Customer By Id Model
export interface CustomerByIdModel {
  id: string;
  store_id: string;
  name: string;
  email: string;
  official_id_number: string;
  official_id_type: string;
  address_zip_code: any;
  address_city: any;
  address_state: any;
  address_country: any;
  created_at: string;
  updated_at: string;
  store: CustomerByIdStore;
}

export interface CustomerByIdStore {
  id: string;
  company_id: string;
  name: string;
  support_email: any;
  support_phone: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sellers: CustomerByIdSeller[];
}

export interface CustomerByIdSeller {
  id: string;
  name: string;
  email: string;
  avatar: any;
  locale_id: string;
  official_id_number: string;
  official_id_type: string;
  is_active: boolean;
  kyc_status: string;
  risk_level: string;
  email_verified_at: any;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  store_id: string;
  seller_id: string;
  role_id: string;
  invited_at: string;
  invite_accepted_at: string;
}

//Transactions By Customer Model
export interface TransactionsByCustomerModel {
  current_page: number;
  data: TransactionsByCustomer[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: TransactionsByCustomerLink[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface TransactionsByCustomer {
  id: string;
  customer_id: string;
  shipping_option_id: any;
  status: string;
  antifraud_status: string;
  delivery_status: string;
  shipping_cost: string;
  tracking_code: any;
  created_at: string;
  updated_at: string;
  total_price: number;
  total_price_with_shipping: number;
  products: TransactionsByCustomerProduct[];
}

export interface TransactionsByCustomerProduct {
  id: string;
  store_id: string;
  category_id: any;
  parent_id: any;
  sku: string;
  name: string;
  description: any;
  price: number;
  color: any;
  size: any;
  min_stock_threshold: number;
  track_stock: boolean;
  is_active: boolean;
  is_digital: boolean;
  latest_low_stock_notification_at: any;
  created_at: string;
  updated_at: string;
  current_stock: string;
  is_base_product: boolean;
  pivot: TransactionsByCustomerPivot;
}

export interface TransactionsByCustomerPivot {
  sale_id: string;
  product_id: string;
}

export interface TransactionsByCustomerLink {
  url?: string;
  label: string;
  active: boolean;
}

//Customer Dashboard Model
export interface CustomerDashboardModel {
  total_sales: number;
  total_sales_value: number;
  sales_awaiting_payment: number;
  sales_awaiting_payment_value: number;
  sales_awaiting_payment_percentage: number;
  sales_cancelled: number;
  sales_cancelled_value: number;
  sales_cancelled_percentage: number;
}
