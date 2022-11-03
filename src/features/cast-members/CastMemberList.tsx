import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCastMemberMutation,
  useGetCastMembersQuery,
} from "./CastMemberSlice";
import { CastMembersTable } from "./components/CastMembersTable";

const initialOptions = {
  page: 1,
  search: "",
  per_page: 10,
  rowsPerPage: [10, 20, 30],
};

export const CastMemberList = () => {
  const [options, setOptions] = useState(initialOptions);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isFetching, error } = useGetCastMembersQuery(options);
  const [deleteCastMember, deleteCastMemberStatus] =
    useDeleteCastMemberMutation();

  async function handleDeleteCastMember(id: string) {
    await deleteCastMember({ id });
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
    if (deleteCastMemberStatus.isSuccess) {
      enqueueSnackbar(`Cast Member deleted successfully`, {
        variant: "success",
      });
    }
    if (deleteCastMemberStatus.error) {
      enqueueSnackbar(`Cast Member not deleted`, {
        variant: "error",
      });
    }
  }, [deleteCastMemberStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching cast members</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Grid container>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-start">
            <Typography variant="h4">Cast Members List</Typography>
          </Box>
        </Grid>
        {/* New Category Button*/}
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/cast-members/create"
              sx={{ mb: "1rem" }}
            >
              New Cast Member
            </Button>
          </Box>
        </Grid>
      </Grid>
      <CastMembersTable
        data={data}
        isFetching={isFetching}
        perPage={options.per_page}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCastMember}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
};
