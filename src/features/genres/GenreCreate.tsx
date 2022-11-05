import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Genre } from "../../types/Genre";
import { GenreForm } from "./components/GenreForm";
import {
  initialState as genreInitialState,
  useCreateGenreMutation,
  useGetCategoriesForGenreQuery,
} from "./GenreSlice";
import { mapGenrePayload } from "./utils";

export const GenreCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createGenre, status] = useCreateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(genreInitialState);
  const { data: categories } = useGetCategoriesForGenreQuery();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createGenre(mapGenrePayload(genreState));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGenreState({ ...genreState, [name]: value });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Genre created successfully`, {
        variant: "success",
      });
    }
    if (status.error) {
      enqueueSnackbar(`Genre not created`, { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Genre</Typography>
          </Box>
        </Box>
        {/* Form */}
        <GenreForm
          genre={genreState}
          categories={categories?.data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  );
};
