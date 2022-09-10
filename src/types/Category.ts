export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Result {
  data: Category;
}

export interface Results {
  meta: Meta;
  links: Links;
  data: Category[];
}

export interface Links {
  prev: null;
  next: string;
  last: string;
  first: string;
}

export interface Meta {
  to: number;
  from: number;
  path: string;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
}

export interface CategoryParams {
  page?: number;
  per_page?: number;
  search?: string;
  is_active?: boolean;
}
