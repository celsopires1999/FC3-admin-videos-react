import { FormControlLabel, FormControlLabelProps, Radio } from "@mui/material";
import { Rating, Ratings, RATING_OPTIONS } from "./Rating";

const ratings: FormControlLabelProps[] = RATING_OPTIONS.map(
  (rating) =>
    ({
      value: rating,
      control: <Radio color="primary" />,
      label: <Rating rating={rating as Ratings} />,
      labelPlacement: "top",
    } as FormControlLabelProps)
);

type Props = {
  isDisabled?: boolean;
};

export const RatingsList = ({ isDisabled }: Props) => {
  return (
    <>
      {ratings.map((rating, index) => (
        <FormControlLabel
          key={index}
          value={rating.value}
          control={rating.control}
          label={rating.label}
          labelPlacement={rating.labelPlacement}
          disabled={isDisabled}
          sx={{
            ...(index === 0 && { ml: 0 }),
            ...(index === ratings.length - 1 && { mr: 0 }),
          }}
        />
      ))}
    </>
  );
};
