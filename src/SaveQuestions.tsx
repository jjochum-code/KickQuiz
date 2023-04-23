import React from "react";
import { IQuestions } from "./interfaces";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Button, Box } from "@mui/material";
import fileDownload from "js-file-download";

interface IProps {
  questions: IQuestions[];
}

export function SaveQuestions({ questions }: IProps): JSX.Element {
  return (
    <Button
      variant="contained"
      onClick={() => saveQuestions(questions)}
      sx={{ width: "100%" }}
    >
      <SaveAltIcon />
      &nbsp;&nbsp; Fragen Speichern
    </Button>
  );
}

function saveQuestions(questions: IQuestions[]) {
  let fileContent = "";
  questions.forEach((question) => {
    fileContent += "Frage:\n";
    fileContent += question.q + "\n";
    fileContent += "Antwort:\n";
    fileContent += question.a + "\n\n";
  });

  fileDownload(fileContent, "filename.txt");
}
