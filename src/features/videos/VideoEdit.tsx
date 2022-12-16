import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Video } from "../../types/Video";
import { VideoForm } from "./components/VideoForm";
import {
  initialState as videoInitialState,
  useGetAllCategoriesQuery,
  useGetAllGenresQuery,
  useGetAllCastMembersQuery,
  useGetVideoQuery,
  useUpdateVideoMutation,
} from "./VideoSlice";
import { mapVideoPayload } from "./utils";

export const VideoEdit = () => {
  const id = useParams().id ?? "";
  const { data: video, isFetching } = useGetVideoQuery({ id });
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: genres } = useGetAllGenresQuery();
  const { data: cast_members } = useGetAllCastMembersQuery();
  const [updateVideo, status] = useUpdateVideoMutation();
  const [videoState, setVideoState] = useState<Video>(videoInitialState);

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateVideo(mapVideoPayload(videoState));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVideoState({ ...videoState, [name]: value });
  };

  useEffect(() => {
    if (video) {
      setVideoState(video.data);
    }
  }, [video]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Video updated successfully`, {
        variant: "success",
      });
    }
    if (status.error) {
      console.error(status.error);
      enqueueSnackbar(`Video not updated`, { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Video</Typography>
          </Box>
        </Box>
        <VideoForm
          video={videoState}
          genres={genres?.data}
          categories={categories?.data}
          cast_members={cast_members?.data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isLoading={isFetching || status.isLoading}
          isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  );
};
