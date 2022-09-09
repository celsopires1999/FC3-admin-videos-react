import {
  CastMember,
  CastMemberParams,
  Result,
  Results,
} from "../../types/CastMember";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/cast_members";

export const initialState: CastMember = {
  id: "",
  name: "",
  type: 0,
  deletedAt: "",
  createdAt: "",
  updatedAt: "",
};

function getCastMembers(params: CastMemberParams) {
  const { page = 1, perPage = 10, type, search } = params;
  return `${endpointUrl}?${parseQueryParams({
    page,
    perPage,
    search,
    type,
  })}`;
}

function parseQueryParams(params: CastMemberParams) {
  const query = new URLSearchParams();

  params.page && query.append("page", params.page.toString());
  params.perPage && query.append("per_page", params.perPage.toString());
  params.search && query.append("search", params.search);
  params.type && query.append("type", params.type.toString());

  return query.toString();
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getCastMembers: query<Results, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"],
    }),
  }),
});

export const { useGetCastMembersQuery } = castMembersApiSlice;
