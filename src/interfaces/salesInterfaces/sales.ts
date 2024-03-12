export interface SalesModel {
  current_page: number;
  data: Sales[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: SalesLink[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface Sales {
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
  customer: SalesCustomer;
  payment: Payment;
  products: SalesProduct[];
}

export interface Payment {
  id: string;
  external_id: string;
  sale_id: string;
  method: string;
  status: string;
  amount: string;
  details: any[];
  paid_at: string;
  refunded_at: any;
  created_at: string;
  updated_at: string;
  paid_at_for_humans: string;
}

export interface SalesCustomer {
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
  primary_phone: string;
}

export interface SalesProduct {
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
  can_be_sold: boolean;
  is_low_on_stock: boolean;
  is_out_of_stock: boolean;
  pivot: SalesPivot;
  store: SalesStore;
}

export interface SalesPivot {
  sale_id: string;
  product_id: string;
  amount: number;
  price: string;
}

export interface SalesStore {
  id: string;
  company_id: string;
  name: string;
  support_email: any;
  support_phone: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  company: SalesCompany;
}

export interface SalesCompany {
  id: string;
  owner_id: string;
  country_id: string;
  business_name: string;
  trading_name: string;
  official_id_number: string;
  official_id_type: string;
  risk_level: string;
  kyb_status: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SalesLink {
  url?: string;
  label: string;
  active: boolean;
}

//Sale By Id Model
export interface SaleByIdModel {
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
  customer: SaleByIdCustomer;
  payment: SaleByIdPayment;
  products: SaleByIdProduct[];
}

export interface SaleByIdPayment {
  id: string;
  external_id: string;
  sale_id: string;
  method: string;
  status: string;
  amount: string;
  details: any[];
  paid_at: string;
  refunded_at: any;
  created_at: string;
  updated_at: string;
  paid_at_for_humans: string;
}

export interface SaleByIdCustomer {
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
  primary_phone: string;
}

export interface SaleByIdProduct {
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
  can_be_sold: boolean;
  is_low_on_stock: boolean;
  is_out_of_stock: boolean;
  pivot: SaleByIdPivot;
  store: SaleByIdStore;
}

export interface SaleByIdPivot {
  sale_id: string;
  product_id: string;
  amount: number;
  price: string;
}

export interface SaleByIdStore {
  id: string;
  company_id: string;
  name: string;
  support_email: any;
  support_phone: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  company: SaleByIdCompany;
}

export interface SaleByIdCompany {
  id: string;
  owner_id: string;
  country_id: string;
  business_name: string;
  trading_name: string;
  official_id_number: string;
  official_id_type: string;
  risk_level: string;
  kyb_status: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
