import { Box, Typography } from "@mui/material";

const RATINGS = {
  L: "#39B549",
  "10": "#20A3D4",
  "12": "#E79738",
  "14": "#E35E00",
  "16": "#D00003",
  "18": "#000000",
} as const;

/// I could not use "const RATING_OPTIONS = Object.keys(RATINGS);" because the "L" goes to the end of the array
export const RATING_OPTIONS = ["L", "10", "12", "14", "16", "18"];

export type Ratings = keyof typeof RATINGS;

type Props = {
  rating: Ratings;
};

export const Rating = ({ rating }: Props) => (
  <Box
    sx={{
      width: 40,
      height: 40,
      borderRadius: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: RATINGS[rating],
    }}
  >
    <Typography variant="h5">{rating}</Typography>
  </Box>
);
