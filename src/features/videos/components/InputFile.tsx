import DeleteIcon from "@mui/icons-material/Delete";
import FileIcon from "@mui/icons-material/FileCopy";
import { IconButton, TextField } from "@mui/material";
import React, { useRef, useState } from "react";

type Props = {
  onAdd: (file: File | null) => void;
  onRemove: (file: File) => void;
};

export const InputFile = ({ onAdd, onRemove }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      onAdd(event.target.files[0]);
    }
  };

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (selectedFile) {
      onRemove(selectedFile);
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
        value={selectedFile ? selectedFile.name : ""}
        InputProps={{
          readOnly: true,
          endAdornment: selectedFile ? (
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
