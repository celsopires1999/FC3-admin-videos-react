import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
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
    createCategory(state, action) {},
    updateCategory(state, action) {},
    deleteCategory(state, action) {},
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
