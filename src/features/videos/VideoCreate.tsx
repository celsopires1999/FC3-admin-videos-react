import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Video } from "../../types/Video";
import { VideoForm } from "./components/VideoForm";
import {
  initialState as videoInitialState,
  useCreateVideoMutation,
  useGetAllCategoriesQuery,
  useGetAllCastMembersQuery,
  useGetAllGenresQuery,
} from "./VideoSlice";
import { mapVideoPayload } from "./utils";

export const VideoCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createVideo, status] = useCreateVideoMutation();
  const [videoState, setVideoState] = useState<Video>(videoInitialState);
  const { data: categories } = useGetAllCategoriesQuery();
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
          categories={categories?.data}
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
