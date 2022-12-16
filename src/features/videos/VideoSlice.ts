import {
  Video,
  VideoParams,
  Result,
  Results,
  VideoPayload,
} from "../../types/Video";
import { apiSlice } from "../api/apiSlice";
import { Results as CategoryResults } from "../../types/Category";

const endpointUrl = "/videos";

export const initialState: Video = {
  id: "",
  title: "",
  description: "",
  year_launched: 0,
  opened: false,
  rating: "",
  duration: 0,
  deleted_at: "",
  created_at: "",
  updated_at: "",
  genres: [],
  categories: [],
  cast_members: [],
  thumb_file_URL: "",
  banner_file_URL: "",
  trailer_file_URL: "",
  video_file_URL: "",
};

function getVideos(params: VideoParams) {
  const { page = 1, per_page = 10, opened, search } = params;
  return `${endpointUrl}?${parseQueryParams({
    page,
    per_page,
    search,
    opened,
  })}`;
}

function parseQueryParams(params: VideoParams) {
  const query = new URLSearchParams();

  params.page && query.append("page", params.page.toString());
  params.per_page && query.append("per_page", params.per_page.toString());
  params.search && query.append("search", params.search);
  params.opened && query.append("opened", params.opened.toString());

  return query.toString();
}

function getVideo({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "GET",
  };
}

function createVideo(videoPayload: VideoPayload) {
  return { url: endpointUrl, method: "POST", body: videoPayload };
}

function updateVideo(videoPayload: VideoPayload) {
  return {
    url: `${endpointUrl}/${videoPayload.id}`,
    method: "PUT",
    body: videoPayload,
  };
}

function deleteVideo({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE",
  };
}

function getCategoriesForVideo() {
  return `/categories?all=true`;
}

export const videosApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategoriesForVideo: query<CategoryResults, void>({
      query: getCategoriesForVideo,
    }),
    getVideos: query<Results, VideoParams>({
      query: getVideos,
      providesTags: ["Videos"],
    }),
    getVideo: query<Result, { id: string }>({
      query: getVideo,
      providesTags: ["Videos"],
    }),
    createVideo: mutation<Result, VideoPayload>({
      query: createVideo,
      invalidatesTags: ["Videos"],
    }),
    updateVideo: mutation<Result, VideoPayload>({
      query: updateVideo,
      invalidatesTags: ["Videos"],
    }),
    deleteVideo: mutation<{}, { id: string }>({
      query: deleteVideo,
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideoQuery,
  useGetVideosQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useGetCategoriesForVideoQuery,
} = videosApiSlice;
