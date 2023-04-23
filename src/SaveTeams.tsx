import React from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Button } from "@mui/material";
import fileDownload from "js-file-download";

interface IProps {
  teamBlue: string[];
  teamRed: string[];
}

export function SaveTeams({ teamBlue, teamRed }: IProps): JSX.Element {
  return (
    <div>
      <Button variant="contained" onClick={() => saveTeams(teamBlue, teamRed)}>
        <SaveAltIcon />
        &nbsp;&nbsp; Teams Speichern
      </Button>
    </div>
  );
}

function saveTeams(teamBlue: string[], teamRed: string[]) {
  let fileContent = "";

  fileContent += "Blaues Team:\n";
  teamBlue.forEach((student) => (fileContent += student + "\n"));

  fileContent += "\n";

  fileContent += "Rotes Team:\n";
  teamRed.forEach((student) => (fileContent += student + "\n"));

  fileContent += "\n";
  fileDownload(fileContent, "Teams.txt");
}
