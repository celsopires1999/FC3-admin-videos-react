import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useUniqueCategories } from "../../hooks/useUniqueCategories";
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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [categories] = useUniqueCategories(videoState, setVideoState);
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

  const handleAddFile = (files: FileList | null) => {
    if (!files) return;
    const filesArray = Array.from(files);
    setSelectedFiles([...selectedFiles, ...filesArray]);
  };

  const handleRemoveFile = (file: File) => {
    setSelectedFiles(selectedFiles.filter((f) => f !== file));
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
          categories={categories}
          cast_members={cast_members?.data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleAddFile={handleAddFile}
          handleRemoveFile={handleRemoveFile}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  );
};
