import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CategoryParams, Results } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

const endpointUrl = "/categories";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    deleteCategory: mutation<Results, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

function getCategories({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search, isActive: true };

  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function parseQueryParams(params: CategoryParams): string {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("per_page", params.perPage.toString());
  }

  if (params.search) {
    query.append("search", params.search);
  }

  if (params.isActive) {
    query.append("is_active", params.isActive.toString());
  }

  return query.toString();
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

const dummyData: Category = {
  id: "016b3829-dad3-4466-b211-7bc771843869",
  name: "Olive",
  description: "Earum quo at dolor tempore nisi.",
  is_active: true,
  deleted_at: null,
  created_at: "2022-08-15T10:59:59+0000",
  updated_at: "2022-08-15T10:59:59+0000",
};

export const initialState = [
  dummyData,
  {
    ...dummyData,
    id: "116b3829-dad3-4466-b211-7bc771843869",
    name: "Peach",
  },
  {
    ...dummyData,
    id: "216b3829-dad3-4466-b211-7bc771843869",
    name: "Apple",
    is_active: false,
  },
  {
    ...dummyData,
    id: "316b3829-dad3-4466-b211-7bc771843869",
    name: "Banana",
  },
  {
    ...dummyData,
    id: "416b3829-dad3-4466-b211-7bc771843869",
    name: "Orange",
  },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      // find index on state of categorySlice";
      const index = state.findIndex(
        (categorie) => categorie.id === action.payload.id
      );

      if (index === -1) {
        throw new Error(
          `categorie Id ${action.payload.id} not found on deleteCategory`
        );
      }
      // update category on state of categorySlice
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      // find index on state of categorySlice";
      const index = state.findIndex(
        (categorie) => categorie.id === action.payload
      );

      if (index === -1) {
        throw new Error(
          `categorie Id ${action.payload} not found on deleteCategory`
        );
      }
      // delete category on state
      state.splice(index, 1);
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((c) => c.id === id);

  return (
    category || {
      id: "",
      name: "",
      description: "",
      is_active: false,
      deleted_at: "",
      created_at: "",
      updated_at: "",
    }
  );
};

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;

export const { useGetCategoriesQuery, useDeleteCategoryMutation } =
  categoriesApiSlice;
