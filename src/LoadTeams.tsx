import React, { useState } from "react";
import { chooseFile, reloadFile } from "./fileLoaderFunctions";

interface IProps {
  setTeamRed: Function;
  setTeamBlue: Function;
}

export function LoadTeams({ setTeamRed, setTeamBlue }: IProps): JSX.Element {
  const [selectedFilePlayers, setSelectedFilePlayers] = useState();
  function parseConfigPlayers(input: string) {
    let splitInput = input.split("\n");
    let regexBlue = /bl+a+u+e+s+ +t+e+a+m+:/i;
    let regexBlueFirst =
      /(?:bl+a+u+e+s+ +t+e+a+m+:)(?<bt>([a-zöäü\n]*?))(?:ro+t+e+s+ t+e+a+m+:)(?<rt>[a-zöäü\n]*)/i;
    let regexRedFirst =
      /(?:ro+t+e+s+ t+e+a+m+:)(?<bt>([a-zöäü\n]*?))(?:bl+a+u+e+s+ +t+e+a+m+:)(?<rt>[a-zöäü\n]*)/i;
    // remove empty lines
    splitInput = splitInput.filter((x) => x.length > 0);

    let match;
    if (regexBlue.test(splitInput[0])) {
      match = input.match(regexBlueFirst);
    } else {
      match = input.match(regexRedFirst);
    }
    if (match === null || match.groups === null) {
      alert("Die Spielerdatei konnte nicht geladen werden :(");
      return;
    }
    let redTeam = match.groups!.rt.split("\n").filter((x) => x.length > 0);
    let blueTeam = match.groups!.bt.split("\n").filter((x) => x.length > 0);

    setTeamRed(redTeam);
    setTeamBlue(blueTeam);
    // setLoadedConfig((baseState: IConfig) => ({student: {red: redTeam, blue: blueTeam}, questions: baseState.questions}));
  }

  return (
    <div>
      {" "}
      <input
        type="file"
        name="file"
        onChange={(event) => {
          chooseFile(event, setSelectedFilePlayers);
        }}
      />
      <button
        onClick={() => reloadFile(selectedFilePlayers, parseConfigPlayers)}
      >
        SpielerLaden
      </button>
    </div>
  );
}
