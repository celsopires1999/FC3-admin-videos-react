import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { LinearProgressWithLabel } from "../../components/Progress";
import { selectUploads } from "./UploadSlice";

export const UploadList = () => {
  const uploadList = useAppSelector(selectUploads);

  if (!uploadList || uploadList.length === 0) {
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
            {uploadList.map((upload, index) => (
              <Box key={index}>
                <Typography>{upload.field}</Typography>
                <ListItem key={index}>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgressWithLabel value={upload.progress ?? 0} />
                  </Box>
                </ListItem>
              </Box>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
