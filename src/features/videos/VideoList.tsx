import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteVideoMutation, useGetVideosQuery } from "./VideoSlice";
import { VideosTable } from "./components/VideosTable";

const initialOptions = {
  page: 1,
  search: "",
  per_page: 10,
  rowsPerPage: [10, 20, 30],
};

export const VideoList = () => {
  const [options, setOptions] = useState(initialOptions);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isFetching, error } = useGetVideosQuery(options);
  const [deleteVideo, deleteVideoStatus] = useDeleteVideoMutation();

  async function handleDeleteVideo(id: string) {
    await deleteVideo({ id });
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
    if (deleteVideoStatus.isSuccess) {
      enqueueSnackbar(`Video deleted successfully`, {
        variant: "success",
      });
    }
    if (deleteVideoStatus.error) {
      enqueueSnackbar(`Video not deleted`, {
        variant: "error",
      });
    }
  }, [deleteVideoStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching cast members</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Grid container>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-start">
            <Typography variant="h4">Videos List</Typography>
          </Box>
        </Grid>
        {/* New Video Button*/}
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/videos/create"
              sx={{ mb: "1rem" }}
            >
              New Video
            </Button>
          </Box>
        </Grid>
      </Grid>
      <VideosTable
        data={data}
        isFetching={isFetching}
        perPage={options.per_page}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteVideo}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
};
