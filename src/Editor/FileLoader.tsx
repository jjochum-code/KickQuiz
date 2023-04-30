import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { reloadFile, chooseFile } from "../fileLoaderFunctions";

interface IFileLoaderProps {
  parseFileContent: (input: string) => void;
  buttonText: string;
  finishedCallback: () => void;
}

export function FileLoader({
  parseFileContent,
  buttonText,
  finishedCallback,
}: IFileLoaderProps): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (selectedFile) {
      reloadFile(selectedFile, parseFileContent);
      finishedCallback();
    }
  }, [selectedFile, parseFileContent, finishedCallback]);

  return (
    <Button variant="contained" component="label" color={"secondary"}>
      <FolderOpenIcon />
      &nbsp;&nbsp; {buttonText}
      <input
        type="file"
        hidden
        onChange={(event) => {
          chooseFile(event, setSelectedFile);
        }}
      />
    </Button>
  );
}
