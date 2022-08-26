import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

const category: Category = {
  id: "016b3829-dad3-4466-b211-7bc771843869",
  name: "Olive",
  description: "Earum quo at dolor tempore nisi.",
  is_active: true,
  deleted_at: null,
  created_at: "2022-08-15T10:59:59+0000",
  updated_at: "2022-08-15T10:59:59+0000",
};

export const initialState = [
  category,
  { ...category, id: "116b3829-dad3-4466-b211-7bc771843869", name: "Peach" },
  { ...category, id: "216b3829-dad3-4466-b211-7bc771843869", name: "Apple" },
  { ...category, id: "316b3829-dad3-4466-b211-7bc771843869", name: "Banana" },
  { ...category, id: "416b3829-dad3-4466-b211-7bc771843869" },
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
export default categoriesSlice.reducer;
