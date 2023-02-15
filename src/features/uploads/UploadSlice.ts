import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type UploadState = {
  id: string;
  file: File;
  field: string;
  videoId: string;
  progress?: number;
  status?: "idle" | "loading" | "success" | "failed";
};

export type UploadProgres = {
  id: string;
  progress: number;
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
    setUploadProgress(state, action: PayloadAction<UploadProgres>) {
      const { id, progress } = action.payload;
      const upload = state.find((state) => state.id === id);
      if (upload) {
        upload.progress = progress;
      }
    },
  },
});

export const selectUploads = (state: RootState) => state.uploadSlice;
export const { addUpload, removeUpload, setUploadProgress } =
  uploadSlice.actions;
export const uploadReducer = uploadSlice.reducer;
