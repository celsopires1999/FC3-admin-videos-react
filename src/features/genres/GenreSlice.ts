import { Results as CategoryResults } from "../../types/Category";
import {
  Genre,
  GenreParams,
  GenrePayload,
  Result,
  Results,
} from "../../types/Genre";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/genres";

export const initialState: Genre = {
  id: "",
  name: "",
  categories: [],
  deleted_at: "",
  created_at: "",
  updated_at: "",
};

function getGenres(params: GenreParams) {
  const { page = 1, per_page = 10, is_active = true, search } = params;
  return `${endpointUrl}?${parseQueryParams({
    page,
    per_page,
    search,
    is_active,
  })}`;
}

function parseQueryParams(params: GenreParams) {
  const query = new URLSearchParams();

  params.page && query.append("page", params.page.toString());
  params.per_page && query.append("per_page", params.per_page.toString());
  params.search && query.append("search", params.search);
  params.is_active && query.append("is_active", params.is_active.toString());

  return query.toString();
}

function getGenre({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "GET",
  };
}

function createGenre(genrePayload: GenrePayload) {
  return { url: endpointUrl, method: "POST", body: genrePayload };
}

function updateGenre(genrePayload: GenrePayload) {
  return {
    url: `${endpointUrl}/${genrePayload.id}`,
    method: "PUT",
    body: genrePayload,
  };
}

function deleteGenre({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE",
  };
}

function getCategoriesForGenre() {
  return `/categories?all=true`;
}

export const genresApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategoriesForGenre: query<CategoryResults, void>({
      query: getCategoriesForGenre,
    }),
    getGenres: query<Results, GenreParams>({
      query: getGenres,
      providesTags: ["Genres"],
    }),
    getGenre: query<Result, { id: string }>({
      query: getGenre,
      providesTags: ["Genres"],
    }),
    createGenre: mutation<Result, GenrePayload>({
      query: createGenre,
      invalidatesTags: ["Genres"],
    }),
    updateGenre: mutation<Result, GenrePayload>({
      query: updateGenre,
      invalidatesTags: ["Genres"],
    }),
    deleteGenre: mutation<{}, { id: string }>({
      query: deleteGenre,
      invalidatesTags: ["Genres"],
    }),
  }),
});

export const {
  useGetGenreQuery,
  useGetGenresQuery,
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useGetCategoriesForGenreQuery,
} = genresApiSlice;
