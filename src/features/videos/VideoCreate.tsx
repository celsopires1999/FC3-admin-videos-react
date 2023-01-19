import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
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
  const [categories, setCategories] = useState<Category[] | undefined>([]);
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
    const categories = videoState.genres
      ?.flatMap(({ categories }) => categories)
      .filter((category, index, self) => {
        return self.findIndex((c) => c?.id === category.id) === index;
      });

    setCategories(categories);
  }, [videoState.genres]);

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
          categories={categories}
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
