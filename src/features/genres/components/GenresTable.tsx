import DeleteIcon from "@mui/icons-material/Delete";
import { Chip, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Category } from "../../../types/Category";
import { Results } from "../../../types/Genre";

export type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void;
};

interface GridRowsProps {
  id: string;
  name: string;
  categories: Category[];
  created_at: string;
}

export function GenresTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {
  const gridToolbarComponentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      renderHeader: () => renderCustomHeader("Name"),
      flex: 20,

      renderCell: renderNameCell,
    },
    {
      field: "categories",
      renderHeader: () => renderCustomHeader("Categories"),
      flex: 50,
      renderCell: renderCategoriesCell,
    },
    {
      field: "created_at",
      renderHeader: () => renderCustomHeader("Created At"),
      flex: 20,
      renderCell: renderCreatedAtCell,
    },
    {
      field: "id",
      renderHeader: () => renderCustomHeader("Actions"),
      flex: 10,
      renderCell: renderActionsCell,
    },
  ];

  function renderCustomHeader(header: string) {
    return (
      <Typography color={"primary"} fontWeight={500}>
        {header}
      </Typography>
    );
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/genres/edit/${rowData.id}`}
      >
        <Typography color={"primary"}>{rowData.value}</Typography>
      </Link>
    );
  }

  function renderCategoriesCell(rowData: GridRenderCellParams<Category[]>) {
    const categories = rowData.value ?? [];
    return (
      <Box
        sx={{
          display: "inline",
        }}
      >
        {categories.map((c) => (
          <Chip
            key={c.id}
            label={c.name}
            sx={{
              marginRight: "0.4rem",
              marginTop: "0.2rem",
              marginBottom: "0.2rem",
            }}
          />
        ))}
      </Box>
    );
  }

  function renderCreatedAtCell(rowData: GridRenderCellParams) {
    return (
      <Typography color="primary">
        {new Date(rowData.value).toLocaleDateString("pt-BR")}
      </Typography>
    );
  }

  function renderActionsCell(rowData: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(rowData.value)}
        aria-label="delete"
        data-testid="delete-button"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  const rows: GridRowsProps[] = data ? mapDataToGridRows(data) : [];

  function mapDataToGridRows(data: Results) {
    const { data: genres } = data;
    return genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
      categories: genre.categories,
      created_at: genre.created_at,
    }));
  }

  const rowCount = data?.meta.total ?? 0;

  return (
    <Box sx={{ display: "flex", height: 500 }}>
      <DataGrid
        rows={rows}
        pagination={true}
        columns={columns}
        pageSize={perPage}
        rowCount={rowCount}
        loading={isFetching}
        filterMode={"server"}
        paginationMode={"server"}
        checkboxSelection={false}
        disableColumnFilter={true}
        getRowHeight={() => "auto"}
        disableColumnSelector={true}
        disableDensitySelector={true}
        disableSelectionOnClick={true}
        rowsPerPageOptions={rowsPerPage}
        onPageChange={handleOnPageChange}
        components={{ Toolbar: GridToolbar }}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
        componentsProps={gridToolbarComponentsProps}
      />
    </Box>
  );
}
