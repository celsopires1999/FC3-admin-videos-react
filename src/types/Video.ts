import { CastMember } from "./CastMember";
import { Category } from "./Category";
import { Genre } from "./Genre";

const Filenames = [
  "thumb_file",
  "banner_file",
  "trailer_file",
  "video_file",
] as const;
export type Filename = typeof Filenames[number];

export type FileObject = {
  name: Filename;
  file: File;
};

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
  title: string;
  rating: string;
  opened: boolean;
  duration: number;
  description: string;
  genres_id?: string[];
  year_launched: number;
  categories_id?: string[];
  cast_members_id?: string[];
}
