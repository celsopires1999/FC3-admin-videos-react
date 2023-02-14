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
    removeUpload(state, action: PayloadAction<string>) {
      const id = action.payload;
      return state.filter((upload) => upload.id !== id);
    },
  },
});

export const { addUpload, removeUpload } = uploadSlice.actions;
export const uploadReducer = uploadSlice.reducer;
