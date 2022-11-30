import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Genre } from "../../types/Genre";
import { GenreForm } from "./components/GenreForm";
import {
  initialState as genreInitialState,
  useGetCategoriesForGenreQuery,
  useGetGenreQuery,
  useUpdateGenreMutation,
} from "./GenreSlice";
import { mapGenrePayload } from "./utils";

export const GenreEdit = () => {
  const id = useParams().id ?? "";
  const { data: genre, isFetching } = useGetGenreQuery({ id });
  const { data: categories } = useGetCategoriesForGenreQuery();
  const [updateGenre, status] = useUpdateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(genreInitialState);

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateGenre(mapGenrePayload(genreState));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGenreState({ ...genreState, [name]: value });
  };

  useEffect(() => {
    if (genre) {
      setGenreState(genre.data);
    }
  }, [genre]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Genre updated successfully`, {
        variant: "success",
      });
    }
    if (status.error) {
      enqueueSnackbar(`Genre not updated`, { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Genre</Typography>
          </Box>
        </Box>
        <GenreForm
          genre={genreState}
          categories={categories?.data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isLoading={isFetching || status.isLoading}
          isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  );
};
