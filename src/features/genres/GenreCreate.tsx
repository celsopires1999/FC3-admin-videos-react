import { Box, Paper, Typography } from "@mui/material";
import { GenreForm } from "./components/GenreForm";

export const GenreCreate = () => {
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
          genre={genre}
          categories={[]}
          handleSubmit={() => {}} // handleSubmit={handleSubmit}
          handleChange={() => {}} // handleChange={handleChange}
          isLoading={false} // isLoading={status.isLoading}
          isDisabled={false} // isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  );
};

const genre = {
  id: "id",
  name: "name",
  is_active: false,
  description: null,
  created_at: "",
  updated_at: "",
  deleted_at: null,
};
