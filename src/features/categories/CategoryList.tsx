import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteCategory, selectCategories } from "./categorySlice";
import DeleteIcon from "@mui/icons-material/Delete";

export const CategoryList = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  interface GridRowsProps {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
  }

  const rows: GridRowsProps[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    is_active: category.is_active,
    created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
  }));

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "is_active",
      headerName: "Active?",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "id",
      headerName: "Actions",
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color={"primary"}>{rowData.value}</Typography>
      </Link>
    );
  }

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  function renderActionsCell(rowData: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDeleteCategory(rowData.value)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function handleDeleteCategory(id: string) {
    dispatch(deleteCategory(id));
  }

  const gridToolbarComponentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* New Category Button*/}
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
      {/* Category Table */}
      <Box sx={{ display: "flex", height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnFilter={true}
          disableColumnSelector={true}
          disableDensitySelector={true}
          disableSelectionOnClick={true}
          components={{ Toolbar: GridToolbar }}
          rowsPerPageOptions={[2, 10, 20, 50, 100]}
          componentsProps={gridToolbarComponentsProps}
        />
      </Box>
    </Box>
  );
};
