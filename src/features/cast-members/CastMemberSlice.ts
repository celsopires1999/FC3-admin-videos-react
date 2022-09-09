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

function parseQueryParams(params: CastMemberParams) {
  return null;
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  // @ts-ignore
  endpoints: () => null,
});

export {};
