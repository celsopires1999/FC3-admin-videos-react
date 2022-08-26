import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Category } from "./../../categories/categorySlice";

type Props = {
  category: Category;
  isDisabled?: boolean;
  isLoading?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const CategoryForm = ({
  category,
  isDisabled = false,
  isLoading = false,
  onSubmit,
  handleChange,
  handleToggle,
}: Props) => {
  return (
    <Box p={2}>
      <form>
        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                label="Name"
                value={category.name}
                disabled={isDisabled}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          {/* Description */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="description"
                label="Description"
                value={category.description}
                disabled={isDisabled}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          {/* Is_Active */}
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="is_active"
                    color="secondary"
                    onChange={handleToggle}
                    checked={category.is_active}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Active"
              />
            </FormGroup>
          </Grid>
          {/* Buttons */}
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              {/* Back */}
              <Button variant="contained" component={Link} to="/categories">
                Back
              </Button>
              {/* Save */}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isDisabled}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
