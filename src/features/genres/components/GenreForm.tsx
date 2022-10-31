import { Box } from "@mui/material";
import { Category } from "../../../types/Category";
import { Genre } from "../../../types/Genre";

type Props = {
  genre: Genre;
  categories: Category[];
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
  return <Box p={2}></Box>;
};
