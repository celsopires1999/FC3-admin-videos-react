import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CastMember } from "../../types/CastMember";
import { useCreateCastMemberMutation, initialState } from "./CastMemberSlice";
import { CastMemberForm } from "./components/CastMemberForm";

export const CastMemberCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createCastMember, status] = useCreateCastMemberMutation();
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createCastMember(castMemberState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Cast Member created successfully`, {
        variant: "success",
      });
    }
    if (status.error) {
      enqueueSnackbar(`Cast Member not created`, { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Cast Member</Typography>
          </Box>
        </Box>
        <CastMemberForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isLoading={status.isLoading}
          castMember={castMemberState}
          isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  );
};
