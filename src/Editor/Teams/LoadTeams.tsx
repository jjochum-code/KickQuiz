import React from "react";
import { FileLoader } from "../FileLoader";
import { xor } from "../../Tools/functions";
import { parseConfigPlayers } from "../parsingFunctions";

//// TODO move the parsing to its own function
interface IProps {
  setTeamRed: Function;
  setTeamBlue: Function;
  finishedCallback: () => void;
}

export function LoadTeams({
  setTeamRed,
  setTeamBlue,
  finishedCallback,
}: IProps): JSX.Element {
  function handleTeamsImport(input: string) {
    const { blueTeam, redTeam } = parseConfigPlayers(input);

    if (xor(blueTeam.length === 0, redTeam.length === 0)) {
      alert("Eines der Teams konnte nicht geladen werden.");
    }

    if (blueTeam.length === 0 && redTeam.length === 0) {
      alert("Die Teams konnten nicht geladen werden.");
    }

    setTeamBlue(blueTeam);
    setTeamRed(redTeam);
  }

  return (
    <FileLoader
      parseFileContent={handleTeamsImport}
      buttonText="Datei Öffnen"
      finishedCallback={finishedCallback}
    />
  );
}
