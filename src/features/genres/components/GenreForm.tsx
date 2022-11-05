import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Category } from "../../../types/Category";
import { Genre } from "../../../types/Genre";

export type Props = {
  genre: Genre;
  categories?: Category[];
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const GenreForm = ({
  genre,
  categories,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
}: Props) => {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                label="Name"
                value={genre.name}
                disabled={isDisabled || isLoading}
                onChange={handleChange}
                inputProps={{ "data-testid": "name" }}
              />
            </FormControl>
          </Grid>
          {/* Categories  */}
          <Grid item xs={12}>
            <Autocomplete
              multiple
              disabled={isDisabled || isLoading || !categories}
              loading={isLoading}
              value={genre.categories}
              options={categories ?? []}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  data-testid="categories-input"
                />
              )}
              onChange={(_, value) => {
                handleChange({ target: { name: "categories", value } } as any);
              }}
            />
          </Grid>
          {/* Buttons */}
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              {/* Back */}
              <Button variant="contained" component={Link} to="/genres">
                Back
              </Button>
              {/* Save */}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isDisabled || isLoading}
              >
                {isLoading ? "Loading..." : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
