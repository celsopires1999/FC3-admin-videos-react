import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CastMember } from "../../../types/CastMember";

type Props = {
  castMember: CastMember;
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const CastMemberForm = ({
  castMember,
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
                value={castMember.name}
                disabled={isDisabled || isLoading}
                onChange={handleChange}
                inputProps={{ "data-testid": "name" }}
              />
            </FormControl>
          </Grid>
          {/* Type  */}
          <Grid item xs={12}>
            <FormGroup>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                aria-labelledby="type of cast member"
                defaultValue={1}
                name="type"
                value={castMember.type}
                onChange={handleChange}
                data-testid="type"
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Director"
                  disabled={isDisabled || isLoading}
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Actor"
                  disabled={isDisabled || isLoading}
                />
              </RadioGroup>
            </FormGroup>
          </Grid>
          {/* Buttons */}
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              {/* Back */}
              <Button variant="contained" component={Link} to="/cast-members">
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
