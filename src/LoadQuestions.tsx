import React, { useCallback } from "react";
import { FileLoader } from "./Editor/FileLoader";

//// TODO LoadTeams and LoadQuestions is basically the same, abstract

interface IProps {
  setQuestions: Function;
  finishedCallback: () => void;
}

export function LoadQuestions({
  setQuestions,
  finishedCallback,
}: IProps): JSX.Element {
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

  return (
    <FileLoader
      parseFileContent={parseConfigQuestions}
      buttonText="Datei Öffnen"
      finishedCallback={finishedCallback}
    />
  );
}
