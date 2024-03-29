import { Box, Paper, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useUniqueCategories } from "../../hooks/useUniqueCategories";
import { Filename, FileObject, Video } from "../../types/Video";
import { addUpload } from "../uploads/UploadSlice";
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
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);
  const [categories] = useUniqueCategories(videoState, setVideoState);
  const { data: genres } = useGetAllGenresQuery();
  const { data: cast_members } = useGetAllCastMembersQuery();
  const dispatch = useAppDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { videoPayload } = mapVideoPayload(videoState);
    try {
      const { data } = await createVideo(videoPayload).unwrap();
      handleSubmitUploads(data.id);
    } catch (e) {
      enqueueSnackbar(`Video not created`, { variant: "error" });
    }
  }

  function handleSubmitUploads(videoId: string) {
    selectedFiles.forEach(({ file, name }) => {
      const payload = { id: nanoid(), file, videoId, field: name };
      dispatch(addUpload(payload));
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVideoState({ ...videoState, [name]: value });
  };

  const handleAddFile = ({ name, file }: FileObject) => {
    setSelectedFiles([...selectedFiles, { name, file }]);
  };

  const handleRemoveFile = (name: Filename) => {
    setSelectedFiles(selectedFiles.filter((file) => file.name !== name));
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
