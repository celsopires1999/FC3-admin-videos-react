import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AutocompleteFields } from "../../../components/AutocompleteFields";
import { CastMember } from "../../../types/CastMember";
import { Category } from "../../../types/Category";
import { Genre } from "../../../types/Genre";
import { Video } from "../../../types/Video";

export type Props = {
  video: Video;
  genres?: Genre[];
  categories?: Category[];
  cast_members?: CastMember[];
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const VideoForm = ({
  video,
  genres,
  categories,
  cast_members,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
}: Props) => {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        {/* Panel */}
        <Grid container spacing={3}>
          {/* Left Panel */}
          <Grid container item spacing={3} xs={12} md={6}>
            {/* Title */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  required
                  name="title"
                  label="Title"
                  value={video.title}
                  disabled={isDisabled || isLoading}
                  onChange={handleChange}
                  inputProps={{ "data-testid": "title" }}
                />
              </FormControl>
            </Grid>
            {/* Description */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  required
                  multiline
                  minRows={4}
                  name="description"
                  label="Description"
                  value={video.description}
                  disabled={isDisabled || isLoading}
                  onChange={handleChange}
                  inputProps={{ "data-testid": "description" }}
                />
              </FormControl>
            </Grid>
            {/* Year and Duration */}
            <Grid container item spacing={3}>
              {/* Year */}
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    required
                    name="year_launched"
                    label="Year Lauched"
                    value={video.year_launched}
                    disabled={isDisabled || isLoading}
                    onChange={handleChange}
                    inputProps={{ "data-testid": "year_launched" }}
                  />
                </FormControl>
              </Grid>
              {/* Duration */}
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    required
                    name="duration"
                    label="Duration"
                    value={video.duration}
                    disabled={isDisabled || isLoading}
                    onChange={handleChange}
                    inputProps={{ "data-testid": "duration" }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Panel */}
          <Grid container item spacing={3} xs={12} md={6}>
            {/* Categories  */}
            <Grid item xs={12}>
              <AutocompleteFields
                name="categories"
                label="Categories"
                isLoading={isLoading}
                isDisabled={isDisabled}
                options={categories}
                handleChange={handleChange}
                value={video.categories || []}
              />
            </Grid>
            {/* Genres  */}
            <Grid item xs={12}>
              <AutocompleteFields
                name="genres"
                label="Genres"
                isLoading={isLoading}
                isDisabled={isDisabled}
                options={genres}
                handleChange={handleChange}
                value={video.genres || []}
              />
            </Grid>
            {/* Cast Members  */}
            <Grid item xs={12}>
              <AutocompleteFields
                name="cast_members"
                label="Cast Members"
                isLoading={isLoading}
                isDisabled={isDisabled}
                options={cast_members}
                handleChange={handleChange}
                value={video.cast_members || []}
              />
            </Grid>
          </Grid>

          {/* Buttons */}
          <Grid container item xs={12}>
            <Box display="flex" gap={2}>
              {/* Back */}
              <Button variant="contained" component={Link} to="/videos">
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
