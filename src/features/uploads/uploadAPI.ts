import axios, { AxiosProgressEvent } from "axios";
import { baseUrl } from "../api/apiSlice";

export const API_ENDPOINT = `${baseUrl}/videos`;

export function uploadService(params: {
  field: string;
  file: File;
  videoId: string;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}) {
  const { field, file, videoId, onUploadProgress } = params;
  const endpoint = getEndpoint(videoId);
  const data = formdata(field, file);

  return axios.post(endpoint, data, { onUploadProgress });
}

export function getEndpoint(id: string): string {
  return `${API_ENDPOINT}/${id}`;
}

export function formdata(field: string, file: File): FormData {
  const data = new FormData();
  data.append(field, file);
  data.append("_method", "PATCH");
  data.append("Content-Type", "multipart/form-data");
  return data;
}

export function uploadProgress(progressEvent: AxiosProgressEvent): number {
  if (progressEvent.total) {
    const progress = (progressEvent.loaded * 100) / progressEvent.total;
    return Math.round(progress * 100) / 100;
  }
  return 0;
}
