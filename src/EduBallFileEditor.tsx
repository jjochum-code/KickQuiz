import React, { useState, useEffect } from "react";
import "./App.css";
import { produce } from "immer";
import { QuestionList } from "./QuestionList";
import { StudentList } from "./StudentList";
import { generateTxtFile } from "./generateTxtFile";
import { IConfig, IQuestions, toggleDirections } from "./interfaces";
import { Container } from "@mui/material";
import { dataIndex } from "./constStrings";

export function EduBallFileEditor({
  selectedFile,
  setSelectedFile,
  loadedConfig,
  setLoadedConfig,
}: {
  selectedFile: any;
  setSelectedFile: Function;
  loadedConfig: IConfig;
  setLoadedConfig: Function;
}) {
  const [questions, setQuestions] = useState<IQuestions[]>(
    loadedConfig.questions
  );
  const [teamRed, setTeamRed] = useState<string[]>(loadedConfig.students.red);
  const [teamBlue, setTeamBlue] = useState<string[]>(
    loadedConfig.students.blue
  );
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  useEffect(() => {
    const data = loadData();
    if (data) {
      setQuestions(data.questions);
      setTeamRed(data.students.red);
      setTeamBlue(data.students.blue);
    }
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      saveEditorData(teamBlue, teamRed, questions);
    }
  }, [teamBlue, teamRed, questions, dataLoaded]);

  function reloadFile() {
    try {
      selectedFile.text().then((x: string) => setLoadedConfig(parseConfig(x)));
    } catch (log) {
      alert(
        "Ein fehler beim lesen der Datei ist eingetreten. Bitte geben sie das an einen IT-Experten ihres vertrauens: " +
          log
      );
    }
  }

  function parseConfig(input: string) {
      // regex to filter questions
      const regexQuestions: RegExp = /(((?:fr*a*g*e*:)+)(?<q>[\n!?.,a-z0-9: äöü()=<>$"']*?)(?:an*t*w*o*r*t*:)(?<a>[\n!?.,a-z0-9 :äöü()=<>$"']*?))(?:(?=\2)|$)/gi
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
          x.value.groups!.q = x.value.groups!.q.trim()
          x.value.groups!.a = x.value.groups!.a.trim()
          allQuestions.push(x.value.groups);
      }
      setQuestions(allQuestions);

      let studentsNew = {red: ["ha"], blue: ["he"]};

      setLoadedConfig(() => {
            return {students: studentsNew, questions: allQuestions};
          });
      console.log(allQuestions)
      console.log(loadedConfig)
  }

  function deleteStudent(teamSetter: Function) {
    return function (index: number) {
      teamSetter((baseState: string[]) => {
        const nextState = produce(baseState, (draftState: string[]) => {
          draftState.splice(index, 1);
        });
        return nextState;
      });
    };
  }

  function addStudent(teamSetter: Function, studentName: string = "") {
    teamSetter((prev: string[]) => [...prev, studentName]);
    console.debug(teamBlue);
  }

  function toggleStudentTeam(index: number, direction: toggleDirections) {
    function toggle(
      index: number,
      fromTeam: string[],
      fromTeamSetter: Function,
      toTeamSetter: Function
    ) {
      addStudent(toTeamSetter, fromTeam[index]);
      deleteStudent(fromTeamSetter)(index);
    }
    switch (direction) {
      case "fromBlueToRed":
        toggle(index, teamBlue, setTeamBlue, setTeamRed);
        break;
      case "fromRedToBlue":
        toggle(index, teamRed, setTeamRed, setTeamBlue);
        break;
      default:
        throw new Error("Unknown student change direction");
    }
  }

  //// ---------------------------------------------------------------------------------------------
  //// TODO deduplicate and rename
  function changeTeamBlue(studentname: string, index: number) {
    setTeamBlue((baseState) => {
      const nextState = produce(baseState, (draftState: string[]) => {
        draftState[index] = studentname;
      });
      return nextState;
    });
  }
  function changeTeamRed(studentname: string, index: number) {
    setTeamRed((baseState) => {
      const nextState = produce(baseState, (draftState: string[]) => {
        draftState[index] = studentname;
      });
      return nextState;
    });
  }
  //// ---------------------------------------------------------------------------------------------

  function addQuestion() {
    setQuestions((prev) => [...prev, { q: "", a: "" }]);
  }

  function deleteQuestion(index: number) {
    setQuestions((prev) => {
      const newState = [...prev];
      newState.splice(index, 1);
      return newState;
    });
  }

  function editQuestion(index: number, value: string) {
    setQuestions((prev) => {
      const nextState = produce(prev, (draftState) => {
        draftState[index].q = value;
      });
      return nextState;
    });
  }

  function editAnswer(index: number, value: string) {
    setQuestions((prev) => {
      const nextState = produce(prev, (draftState) => {
        draftState[index].a = value;
      });
      return nextState;
    });
  }

  return (
    <Container>
      <button onClick={() => generateTxtFile(teamBlue, teamRed, questions)}>
        Generate .txt Document
      </button>
      <button onClick={() => reloadFile()}>Generate .txt Document</button>
      <h3>Blaues Team</h3>
      <StudentList
        students={teamBlue}
        changeStudentName={changeTeamBlue}
        deleteStudent={deleteStudent(setTeamBlue)}
        toggleStudentTeam={toggleStudentTeam}
        toggleDirection={"fromBlueToRed"}
      />
      <div>
        <button onClick={() => addStudent(setTeamBlue)}> + </button>
      </div>
      <br />
      <h3>Rotes Team</h3>
      <StudentList
        students={teamRed}
        changeStudentName={changeTeamRed}
        deleteStudent={deleteStudent(setTeamRed)}
        toggleStudentTeam={toggleStudentTeam}
        toggleDirection={"fromRedToBlue"}
      />
      <div>
        <button onClick={() => addStudent(setTeamRed)}> + </button>
      </div>
      <h3>Fragen und Antworten</h3>
      <QuestionList
        questions={questions}
        deleteQuestion={deleteQuestion}
        editQuestion={editQuestion}
        editAnswer={editAnswer}
      />
      <div>
        <button onClick={addQuestion}> + </button>
      </div>
      <br />
      <br />
    </Container>
  );
}

function saveEditorData(
  teamBlue: string[],
  teamRed: string[],
  questions: IQuestions[]
) {
  saveData(mergeData(teamBlue, teamRed, questions));
}

function mergeData(
  teamBlue: string[],
  teamRed: string[],
  questions: IQuestions[]
): IConfig {
  return { students: { red: teamRed, blue: teamBlue }, questions };
}

function saveData(config: IConfig): void {
  localStorage.setItem(dataIndex, JSON.stringify(config, null, 2));
}

function loadData(): IConfig | undefined {
  const dataString = localStorage.getItem(dataIndex);
  if (dataString) {
    try {
      return JSON.parse(dataString) as IConfig;
    } catch {
      console.error("Data loaded from localStorage could not be serialized.");
    }
  }
  return;
}
