export interface Category {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
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
  perPage: number;
  lastPage: number;
  currentPage: number;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}
