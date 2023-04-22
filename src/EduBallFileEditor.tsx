import React, { useState } from "react";
import "./App.css";
import { produce } from "immer";
import { QuestionList } from "./QuestionList";
import { StudentList } from "./StudentList";
import { generateTxtFile } from "./generateTxtFile";
import { IConfig, IQuestions, toggleDirections } from "./interfaces";
import { Container } from "@mui/material";

export function EduBallFileEditor({ loadedConfig }: { loadedConfig: IConfig }) {
  const [questions, setQuestions] = useState<IQuestions[]>(
    loadedConfig.questions
  );
  const [teamRed, setTeamRed] = useState<string[]>(loadedConfig.students.red);
  const [teamBlue, setTeamBlue] = useState<string[]>(
    loadedConfig.students.blue
  );

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

  function addStudent(setTeamBlue: Function, studentName: string = "") {
    setTeamBlue((prev: string[]) => [...prev, studentName]);
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
