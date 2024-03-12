export type RegisterCategoriesCreadentials = {
  name: string;
  description: string;
  is_active: boolean;
};

// Categories List Model
export interface CategoriesListModel {
  current_page: number;
  data: CategoriesList[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: CategoriesListLink[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface CategoriesList {
  id: string;
  store_id: string;
  parent_id: any;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  is_root: boolean;
}

export interface CategoriesListLink {
  url?: string;
  label: string;
  active: boolean;
}

//Categories Dropdown Model
export interface CategoryDropdownModel {
  id: string;
  name: string;
  is_root: boolean;
}
