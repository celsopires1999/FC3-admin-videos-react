import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = `http://host.docker.internal:8000/api`;
export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Categories", "CastMembers", "Genres", "Videos"],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({ baseUrl }),
});
