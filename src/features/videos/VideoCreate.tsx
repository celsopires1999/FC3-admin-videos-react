import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { Category } from "../../types/Category";
import { Video } from "../../types/Video";
import { VideoForm } from "./components/VideoForm";
import { mapVideoPayload } from "./utils";
import {
  initialState as videoInitialState,
  useCreateVideoMutation,
  useGetAllCastMembersQuery,
  useGetAllGenresQuery,
} from "./VideoSlice";

export const VideoCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createVideo, status] = useCreateVideoMutation();
  const [videoState, setVideoState] = useState<Video>(videoInitialState);
  const [uniqueCategories, setUniqueCategories] = useState<Category[]>([]);
  const categoriesToKeep = useRef<Category[] | undefined>(undefined);
  const { data: genres } = useGetAllGenresQuery();
  const { data: cast_members } = useGetAllCastMembersQuery();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createVideo(mapVideoPayload(videoState));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVideoState({ ...videoState, [name]: value });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Video created successfully`, {
        variant: "success",
      });
    }
    if (status.error) {
      console.error(status.error);
      enqueueSnackbar(`Video not created`, { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  useEffect(() => {
    const uniqueCategories = videoState.genres
      ?.flatMap(({ categories }) => categories)
      .filter(filterById) as Category[];

    setUniqueCategories(uniqueCategories);
  }, [videoState.genres]);

  function filterById(
    category: Category | undefined,
    index: number,
    self: (Category | undefined)[]
  ): boolean {
    return index === self.findIndex((c) => c?.id === category?.id);
  }

  useEffect(() => {
    categoriesToKeep.current = videoState.categories?.filter((category) =>
      uniqueCategories.find((c) => c?.id === category.id)
    );
  }, [uniqueCategories, videoState.categories]);

  useEffect(() => {
    setVideoState((state: Video) => ({
      ...state,
      categories: categoriesToKeep.current,
    }));
  }, [uniqueCategories]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Video</Typography>
          </Box>
        </Box>
        {/* Form */}
        <VideoForm
          video={videoState}
          genres={genres?.data}
          categories={uniqueCategories}
          cast_members={cast_members?.data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  );
};
