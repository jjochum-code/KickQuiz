import React, { useState, useEffect, useCallback } from "react";
import { chooseFile, reloadFile } from "./fileLoaderFunctions";
import { Button } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

interface IProps {
  setQuestions: Function;
  finishedCallback: () => void;
}

export function LoadQuestions({
  setQuestions,
  finishedCallback,
}: IProps): JSX.Element {
  const [selectedFileQuestions, setSelectedFileQuestions] = useState();

  const parseConfigQuestions = useCallback(
    (input: string) => {
      // regex to filter questions
      const regexQuestions: RegExp =
        /(((?:fr*a*g*e*:)+)(?<q>[\n!?.,a-z0-9: äöü()=<>$"']*?)(?:an*t*w*o*r*t*:)(?<a>[\n!?.,a-z0-9 :äöü()=<>$"']*?))(?:(?=\2)|$)/gi;
      const matchesQuestions = input.matchAll(regexQuestions);
      // regex to filter team names
      // const regesTeams: RegExp =
      let x;
      let allQuestions: any = [];
      while (true) {
        x = matchesQuestions.next();
        if (x.done === true) {
          break;
        }
        // trim
        x.value.groups!.q = x.value.groups!.q.trim();
        x.value.groups!.a = x.value.groups!.a.trim();
        allQuestions.push(x.value.groups);
      }
      setQuestions(allQuestions);
    },
    [setQuestions]
  );

  useEffect(() => {
    if (selectedFileQuestions) {
      reloadFile(selectedFileQuestions, parseConfigQuestions);
      finishedCallback();
    }
  }, [selectedFileQuestions, parseConfigQuestions]);

  return (
    <Button variant="contained" component="label">
      <FolderOpenIcon />
      &nbsp;&nbsp; Datei Öffnen
      <input
        type="file"
        hidden
        onChange={(event) => {
          chooseFile(event, setSelectedFileQuestions);
        }}
      />
    </Button>
  );
}
