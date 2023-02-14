import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UploadState = {
  id: string;
  file: File;
  field: string;
  videoId: string;
  progress?: number;
  status?: "idle" | "loading" | "success" | "failed";
};

const initialState: UploadState[] = [];

const uploadSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {
    addUpload(state, action: PayloadAction<UploadState>) {
      state.push({ ...action.payload, status: "idle", progress: 0 });
    },
  },
});

export const { addUpload } = uploadSlice.actions;
export const uploadReducer = uploadSlice.reducer;
