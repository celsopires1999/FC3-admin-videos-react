export interface Genre {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Results {
  data: Genre[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: Genre;
}

export interface Links {
  prev: null;
  last: string;
  next: string;
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

export interface GenreParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: number;
}
