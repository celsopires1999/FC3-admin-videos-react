import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategoryById } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryEdit = () => {
  const id = useParams().id || "";
  const [isDisabled, setIsDisabled] = useState(false);
  const category = useAppSelector((state) => selectCategoryById(state, id));

  const handleChange = (e: any) => {
    console.log(e);
  };

  const handleToggle = (e: any) => {
    console.log(e);
  };

  return (
    <Box>
      {/* Component */}
      <Paper>
        {/* Main Label */}
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>
        {/* Form */}
        <CategoryForm
          isLoading={false}
          category={category}
          onSubmit={() => {}}
          isDisabled={isDisabled}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
