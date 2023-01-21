import DeleteIcon from "@mui/icons-material/Delete";
import FileIcon from "@mui/icons-material/FileCopy";
import { IconButton, TextField } from "@mui/material";
import React, { useRef, useState } from "react";

type Props = {
  onAdd: (files: FileList | null) => void;
  onRemove: (file: File) => void;
};

export const InputFile = ({ onAdd, onRemove }: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
    onAdd(event.target.files);
  };

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setSelectedFiles(null);
    if (selectedFiles) {
      onRemove(selectedFiles[0]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <TextField
        type="text"
        placeholder="Select a file"
        value={selectedFiles?.length ? selectedFiles[0].name : ""}
        InputProps={{
          readOnly: true,
          endAdornment: selectedFiles?.length ? (
            <IconButton onClick={handleClear}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleFileInput}>
              <FileIcon />
            </IconButton>
          ),
        }}
      />
      <input
        accept="*"
        type="file"
        id="inputFile"
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
};
