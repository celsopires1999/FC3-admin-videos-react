import { Box, Button, Grid, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";
import { CategoriesTable } from "./components/CategoriesTable";

const initialOptions = {
  page: 1,
  search: "",
  per_page: 10,
  rowsPerPage: [10, 20, 30],
};

export const CategoryList = () => {
  const [options, setOptions] = useState(initialOptions);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
  }

  function handleOnPageChange(page: number): void {
    setOptions({ ...options, page: page + 1 });
  }

  function handleOnPageSizeChange(per_page: number) {
    setOptions({ ...options, per_page });
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
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar(`Category deleted successfully`, { variant: "success" });
    }
    if (deleteCategoryStatus.error) {
      enqueueSnackbar(`Category not deleted`, { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching categories</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Grid container>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-start">
            <Typography variant="h4">Categories List</Typography>
          </Box>
        </Grid>
        {/* New Category Button*/}
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/categories/create"
              sx={{ mb: "1rem" }}
            >
              New Category
            </Button>
          </Box>
        </Grid>
      </Grid>
      {/* Category Table */}
      <CategoriesTable
        data={data}
        isFetching={isFetching}
        perPage={options.per_page}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
};
