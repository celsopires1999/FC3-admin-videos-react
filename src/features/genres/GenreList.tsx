import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteGenreMutation, useGetGenresQuery } from "./GenreSlice";
import { GenresTable } from "./components/GenresTable";

const initialOptions = {
  page: 1,
  search: "",
  per_page: 10,
  rowsPerPage: [10, 20, 30],
};

export const GenreList = () => {
  const [options, setOptions] = useState(initialOptions);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isFetching, error } = useGetGenresQuery(options);
  const [deleteGenre, deleteGenreStatus] = useDeleteGenreMutation();

  async function handleDeleteGenre(id: string) {
    await deleteGenre({ id });
  }

  function handleOnPageChange(page: number): void {
    setOptions({ ...options, page: page + 1 });
  }

  function handleOnPageSizeChange(per_page: number) {
    setOptions({ ...options, per_page: per_page });
  }

  function handleFilterChange(filterModel: GridFilterModel): void {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join(" ");
      setOptions({ ...options, search });
    } else {
      setOptions({ ...options, search: "" });
    }
  }

  useEffect(() => {
    if (deleteGenreStatus.isSuccess) {
      enqueueSnackbar(`Genre deleted successfully`, {
        variant: "success",
      });
    }
    if (deleteGenreStatus.error) {
      enqueueSnackbar(`Genre not deleted`, {
        variant: "error",
      });
    }
  }, [deleteGenreStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching genres</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Grid container>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-start">
            <Typography variant="h4">Genre List</Typography>
          </Box>
        </Grid>
        {/* New Genre Button*/}
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/genres/create"
              sx={{ mb: "1rem" }}
            >
              New Genre
            </Button>
          </Box>
        </Grid>
      </Grid>
      <GenresTable
        data={data}
        isFetching={isFetching}
        perPage={options.per_page}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteGenre}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
};
