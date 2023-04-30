import React from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Button } from "@mui/material";
import fileDownload from "js-file-download";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

interface IProps {
  teamBlue: string[];
  teamRed: string[];
  sx?: SxProps<Theme>;
}

export function SaveTeamsButton({
  teamBlue,
  teamRed,
  sx,
}: IProps): JSX.Element {
  return (
    <Button
      variant="contained"
      onClick={() => saveTeams(teamBlue, teamRed)}
      sx={sx}
      color={"secondary"}
    >
      <SaveAltIcon />
      &nbsp;&nbsp; Teams Speichern
    </Button>
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
