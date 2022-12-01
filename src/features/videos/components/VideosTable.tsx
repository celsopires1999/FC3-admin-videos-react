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
import { Genre } from "../../../types/Genre";
import { Results } from "../../../types/Video";

type Props = {
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
  title: string;
  opened: boolean;
  created_at: string;
}

export function VideosTable({
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
      field: "title",
      renderHeader: () => renderCustomHeader("Title"),

      flex: 25,
      renderCell: renderTitleCell,
    },
    {
      field: "genres",
      renderHeader: () => renderCustomHeader("Genres"),

      flex: 22,
      renderCell: renderGenresCell,
    },
    {
      field: "categories",
      renderHeader: () => renderCustomHeader("Categories"),

      flex: 23,
      renderCell: renderCategoriesCell,
    },
    {
      field: "opened",
      renderHeader: () => renderCustomHeader("Opened"),

      flex: 10,
      renderCell: renderOpenedCell,
    },
    {
      field: "created_at",
      renderHeader: () => renderCustomHeader("Created At"),
      flex: 10,
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

  function renderTitleCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/videos/edit/${rowData.id}`}
      >
        <Typography color={"primary"}>{rowData.value}</Typography>
      </Link>
    );
  }

  function renderGenresCell(rowData: GridRenderCellParams<Genre[]>) {
    const genres = rowData.value ?? [];
    return (
      <Box
        sx={{
          display: "inline",
        }}
      >
        {genres.map((g) => (
          <Chip
            key={g.id}
            label={g.name}
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

  function renderOpenedCell(rowData: GridRenderCellParams) {
    return (
      <Typography color="primary">
        {rowData.value === true ? "Yes" : "No"}
      </Typography>
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
    const { data: videos } = data;
    return videos.map((video) => ({
      id: video.id,
      title: video.title,
      opened: video.opened,
      genres: video.genres,
      categories: video.categories,
      created_at: video.created_at,
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
