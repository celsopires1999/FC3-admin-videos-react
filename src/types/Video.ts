import { CastMember } from "./CastMember";
import { Category } from "./Category";
import { Genre } from "./Genre";

export interface Video {
  id: string;
  title: string;
  description: string;
  year_launched: number;
  opened: boolean;
  rating: string;
  duration: number;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
  genres?: Genre[];
  categories?: Category[];
  cast_members?: CastMember[];
  thumb_file_URL: string;
  banner_file_URL: string;
  trailer_file_URL: string;
  video_file_URL: string;
}

export interface Results {
  data: Video[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: Video;
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

export interface VideoParams {
  page?: number;
  per_page?: number;
  search?: string;
  opened?: boolean;
}

export interface VideoPayload {
  id: string;
  title: string;
  description: string;
  year_launched: number;
  opened: boolean;
  rating: string;
  duration: number;
  categories_id?: string[];
  genres_id?: string[];
  cast_members_id?: string[];
}
