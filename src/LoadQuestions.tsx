import React, { useState } from "react";
import { chooseFile, reloadFile } from "./loaderFunctions";
import { IConfig } from "./interfaces";

interface IProps {
  setQuestions: Function;
}

export function LoadQuestions({ setQuestions }: IProps): JSX.Element {
  function parseConfigQuestions(input: string) {
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

    // setLoadedConfig((baseState: IConfig) => ({
    //   students: baseState.students,
    //   questions: allQuestions,
    // }));
  }

  const [selectedFileQuestions, setSelectedFileQuestions] = useState();
  return (
    <>
      {" "}
      <input
        type="file"
        name="file"
        onChange={(event) => {
          chooseFile(event, setSelectedFileQuestions);
        }}
      />
      <button
        onClick={() => reloadFile(selectedFileQuestions, parseConfigQuestions)}
      >
        Fragen Laden
      </button>
    </>
  );
}
