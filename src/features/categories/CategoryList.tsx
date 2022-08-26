import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";

export const CategoryList = () => {
  const categories = useAppSelector(selectCategories);
  interface GridRowsProp {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
  }

  const rows: GridRowsProp[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    is_active: category.is_active,
    created_at: category.created_at,
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "is_active", headerName: "Active?", width: 150 },
    { field: "created_at", headerName: "Created At", width: 150 },
  ];

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rowsPerPageOptions={[2, 10, 20, 50, 100]}
          rows={rows}
          columns={columns}
        />
      </div>
    </Box>
  );
};
