export interface VariationsListModel {
  current_page: number;
  data: VariationsList[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: VariationsListLink[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface VariationsList {
  id: string;
  store_id: string;
  category_id: any;
  parent_id: string;
  sku?: string;
  name: string;
  description: string;
  price: number;
  color?: string;
  size?: string;
  min_stock_threshold: any;
  track_stock: boolean;
  is_active: boolean;
  is_digital: boolean;
  latest_low_stock_notification_at: any;
  created_at: string;
  updated_at: string;
  current_stock: string;
  is_base_product: boolean;
  parent?: VariationsListParent;
}

export interface VariationsListParent {
  id: string;
  store_id: string;
  category_id: any;
  parent_id: any;
  sku: any;
  name: string;
  description: any;
  price: number;
  color: any;
  size: any;
  min_stock_threshold: any;
  track_stock: boolean;
  is_active: boolean;
  is_digital: boolean;
  latest_low_stock_notification_at: any;
  created_at: string;
  updated_at: string;
  current_stock: string;
  is_base_product: boolean;
}

export interface VariationsListLink {
  url?: string;
  label: string;
  active: boolean;
}

//Variation By Id Model
export interface VariationByIdModel {
  id: string;
  store_id: string;
  category_id: any;
  parent_id: string;
  sku: any;
  name: string;
  description: any;
  price: number;
  color: any;
  size: any;
  min_stock_threshold: any;
  track_stock: boolean;
  is_active: boolean;
  is_digital: boolean;
  latest_low_stock_notification_at: any;
  created_at: string;
  updated_at: string;
  current_stock: string;
  is_base_product: boolean;
  store: VariationByIdStore;
  parent: VariationByIdParent;
  images: Image[];
}

export interface Image {
  id: string;
  owner_type: string;
  owner_id: string;
  path: string;
  mime_type: string;
  size: number;
  description: any;
  is_thumbnail: boolean;
  created_at: string;
  updated_at: string;
  size_for_humans: string;
}

export interface VariationByIdStore {
  id: string;
  company_id: string;
  name: string;
  support_email: string;
  support_phone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sellers: VariationByIdSeller[];
}

export interface VariationByIdSeller {
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
  pivot: VariationByIdPivot;
}

export interface VariationByIdPivot {
  store_id: string;
  seller_id: string;
  role_id: string;
  invited_at: string;
  invite_accepted_at: string;
}

export interface VariationByIdParent {
  id: string;
  store_id: string;
  category_id: any;
  parent_id: any;
  sku: any;
  name: string;
  description: any;
  price: number;
  color: any;
  size: any;
  min_stock_threshold: any;
  track_stock: boolean;
  is_active: boolean;
  is_digital: boolean;
  latest_low_stock_notification_at: any;
  created_at: string;
  updated_at: string;
  current_stock: string;
  is_base_product: boolean;
}
