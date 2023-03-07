import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AutocompleteFields } from "../../../components/AutocompleteFields";
import { RatingsList } from "../../../components/RatingsList";
import { CastMember } from "../../../types/CastMember";
import { Category } from "../../../types/Category";
import { Genre } from "../../../types/Genre";
import { Filename, FileObject, Video } from "../../../types/Video";
import { InputFile } from "./InputFile";

export type Props = {
  video: Video;
  genres?: Genre[];
  categories?: Category[];
  cast_members?: CastMember[];
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddFile: ({ name, file }: FileObject) => void;
  handleRemoveFile: (name: Filename) => void;
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
  handleAddFile,
  handleRemoveFile,
}: Props) => {
  const handleAddThumbnail = (file: File) => {
    handleAddFile({ name: "thumb_file", file });
  };

  const handleRemoveThumbnail = () => {
    handleRemoveFile("thumb_file");
  };

  const handleAddBanner = (file: File) => {
    handleAddFile({ name: "banner_file", file });
  };

  const handleRemoveBanner = () => {
    handleRemoveFile("banner_file");
  };

  const handleAddTrailer = (file: File) => {
    handleAddFile({ name: "trailer_file", file });
  };

  const handleRemoveTrailer = () => {
    handleRemoveFile("trailer_file");
  };

  const handleAddVideo = (file: File) => {
    handleAddFile({ name: "video_file", file });
  };

  const handleRemoveVideo = () => {
    handleRemoveFile("video_file");
  };

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        {/* Panel */}
        <Grid container spacing={4}>
          {/* Left Panel */}
          <Grid item xs={12} md={6} sx={{ "& .MuiTextField-root": { my: 2 } }}>
            {/* Title */}
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
            {/* Description */}
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
            {/* Year and Duration */}
            <Grid container spacing={2}>
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

              {/* Cast Members  */}
              <Grid item xs={12}>
                <AutocompleteFields
                  name={"cast_members"}
                  options={cast_members}
                  label={"Cast Members"}
                  isLoading={isLoading}
                  isDisabled={isDisabled}
                  handleChange={handleChange}
                  value={video.cast_members ?? []}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid
                  container
                  alignContent={"center"}
                  justifyContent={"space-between"}
                  spacing={2}
                >
                  {/* Genres  */}
                  <Grid item xs={5}>
                    <AutocompleteFields
                      name={"genres"}
                      options={genres}
                      label={"Genres"}
                      isLoading={isLoading}
                      isDisabled={isDisabled}
                      handleChange={handleChange}
                      value={video.genres ?? []}
                    />
                  </Grid>

                  {/* Categories  */}
                  <Grid item xs={5}>
                    <AutocompleteFields
                      name={"categories"}
                      options={categories}
                      label={"Categories"}
                      isLoading={isLoading}
                      isDisabled={isDisabled}
                      handleChange={handleChange}
                      value={video.categories ?? []}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Right Panel */}
          <Grid item xs={12} md={6} sx={{ "& .MuiTextField-root": { my: 2 } }}>
            {/* Rating */}
            <FormControl fullWidth>
              <FormLabel component="legend">Rating</FormLabel>
              <RadioGroup
                row
                name="rating"
                value={video.rating}
                onChange={handleChange}
              >
                <RatingsList isDisabled={isDisabled} />
              </RadioGroup>
            </FormControl>
            {/* Files */}
            <FormControl fullWidth>
              <FormLabel component="legend">Thumbnail</FormLabel>
              <InputFile
                onAdd={handleAddThumbnail}
                onRemove={handleRemoveThumbnail}
              />
              <FormLabel component="legend">Banner</FormLabel>
              <InputFile
                onAdd={handleAddBanner}
                onRemove={handleRemoveBanner}
              />
              <FormLabel component="legend">Trailer</FormLabel>
              <InputFile
                onAdd={handleAddTrailer}
                onRemove={handleRemoveTrailer}
              />
              <FormLabel component="legend">Video</FormLabel>
              <InputFile onAdd={handleAddVideo} onRemove={handleRemoveVideo} />
            </FormControl>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box display="flex" sx={{ my: 2 }} gap={2}>
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
      </form>
    </Box>
  );
};
