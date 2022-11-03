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
  type: 1,
  deleted_at: "",
  created_at: "",
  updated_at: "",
};

function getCastMembers(params: CastMemberParams) {
  const { page = 1, per_page = 10, type, search } = params;
  return `${endpointUrl}?${parseQueryParams({
    page,
    per_page,
    search,
    type,
  })}`;
}

function parseQueryParams(params: CastMemberParams) {
  const query = new URLSearchParams();

  params.page && query.append("page", params.page.toString());
  params.per_page && query.append("per_page", params.per_page.toString());
  params.search && query.append("search", params.search);
  params.type && query.append("type", params.type.toString());

  return query.toString();
}

function getCastMember({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "GET",
  };
}

function createCastMember(castMember: CastMember) {
  return { url: endpointUrl, method: "POST", body: castMember };
}

function updateCastMember(castMember: CastMember) {
  return {
    url: `${endpointUrl}/${castMember.id}`,
    method: "PUT",
    body: castMember,
  };
}

function deleteCastMember({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE",
  };
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCastMembers: query<Results, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"],
    }),
    getCastMember: query<Result, { id: string }>({
      query: getCastMember,
      providesTags: ["CastMembers"],
    }),
    createCastMember: mutation<Result, CastMember>({
      query: createCastMember,
      invalidatesTags: ["CastMembers"],
    }),
    updateCastMember: mutation<Result, CastMember>({
      query: updateCastMember,
      invalidatesTags: ["CastMembers"],
    }),
    deleteCastMember: mutation<{}, { id: string }>({
      query: deleteCastMember,
      invalidatesTags: ["CastMembers"],
    }),
  }),
});

export const {
  useGetCastMemberQuery,
  useGetCastMembersQuery,
  useCreateCastMemberMutation,
  useUpdateCastMemberMutation,
  useDeleteCastMemberMutation,
} = castMembersApiSlice;
