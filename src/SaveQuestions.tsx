import React from "react";
import { IQuestions } from "./interfaces";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Button } from "@mui/material";
import fileDownload from "js-file-download";

interface IProps {
  questions: IQuestions[];
}

export function SaveQuestions({ questions }: IProps): JSX.Element {
  return (
    <div>
      <Button variant="contained" onClick={() => saveQuestions(questions)}>
        <SaveAltIcon />
        &nbsp;&nbsp; Fragen Speichern
      </Button>
    </div>
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
