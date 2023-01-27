import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Filename } from "../../types/Video";

export type Upload = {
  name: Filename;
  progress: number;
};

export type Props = {
  children?: React.ReactNode;
  uploads?: Upload[];
};

export const UploadList = ({ children, uploads }: Props) => {
  if (!uploads || uploads.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: 9,
        "@media (min-width: 600px)": {
          width: 450,
        },
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="upload-content"
        >
          <Typography>Uploads</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {uploads.map((upload, index) => (
              <ListItem key={index}>
                <Typography>{upload.name}</Typography>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
