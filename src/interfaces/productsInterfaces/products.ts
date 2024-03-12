export interface ProductsListModel {
  current_page: number;
  data: ProductsList[];
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

export interface ProductsList {
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
  current_stock: number;
  is_base_product: boolean;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface CreateProductsCredentials {
  store_uuid?: string;
  images?: File[];
  category_id?: string;
  sku?: string;
  name: string;
  description: string;
  price: string;
  color?: string;
  size?: number;
  is_digital?: boolean;
  track_stock?: boolean;
  min_stock_threshold?: number;
  is_active: boolean | number;
}

// Product By Id Model
export interface ProductByIdModel {
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
