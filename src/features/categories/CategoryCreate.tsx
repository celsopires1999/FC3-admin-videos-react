import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Category } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryCreate = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: "",
    created_at: "",
    updated_at: "",
  });

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
            <Typography variant="h4">Create Category</Typography>
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
