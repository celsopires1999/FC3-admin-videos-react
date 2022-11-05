import { Genre } from "../../types/Genre";

export function mapGenrePayload(genre: Genre) {
  return {
    id: genre.id,
    name: genre.name,
    categories_id: genre.categories.map((c) => c.id),
  };
}
