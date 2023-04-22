import React, { useState } from "react";
import "./App.css";
import { produce } from "immer";

export interface IQuestions {
  q: string;
  a: string;
}

export interface IConfig {
  students: {
    red: string[];
    blue: string[];
  };
  questions: IQuestions[];
}

const exampleConfig: IConfig = {
  students: {
    red: ["Alice", "Bob", "Carol"],
    blue: ["David", "Eve", "Frank"],
  },
  questions: [
    {
      q: "What is the capital of France?",
      a: "Paris",
    },
    {
      q: "What is the square root of 64?",
      a: "8",
    },
    {
      q: "What is the chemical symbol for water?",
      a: "H2O",
    },
  ],
};

export function EduBallFileEditor({ loadedConfig }: { loadedConfig: IConfig }) {
  const [questions, setQuestions] = useState<IQuestions[]>(
    loadedConfig.questions
  );
  const [teamRed, setTeamRed] = useState<string[]>(loadedConfig.students.red);
  const [teamBlue, setTeamBlue] = useState<string[]>(
    loadedConfig.students.blue
  );

  function deleteStudent(index: number) {
    setTeamBlue((baseState) => {
      const nextState = produce(baseState, (draftState: string[]) => {
        draftState.splice(index, 1);
      });
      return nextState;
    });
  }

  function addStudent() {
    //
  }

  function toggleStudentTeam() {
    //
  }

  //// ---------------------------------------------------------------------------------------------
  //// TODO deduplicate
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

  return (
    <>
      <h3>Blaues Team</h3>
      <StudentList
        students={teamBlue}
        changeStudentName={changeTeamBlue}
        deleteStudent={deleteStudent}
      />
      <br />
      <h3>Rotes Team</h3>
      <StudentList
        students={teamRed}
        changeStudentName={changeTeamRed}
        deleteStudent={() => {}}
      />
      {teamRed.map((student, index) => (
        <div>{student}</div>
      ))}
      <h3>Fragen und Antworten</h3>
      {questions.map(({ q, a }) => (
        <>
          <div>Frage</div>
          <div>{q}</div>
          <div>{a}</div>
        </>
      ))}
    </>
  );
}

function StudentList({
  students,
  changeStudentName,
  deleteStudent,
}: {
  students: string[];
  changeStudentName: Function;
  deleteStudent: Function;
}) {
  return (
    <>
      {students.map((student, index) => (
        <div>
          <input
            value={student}
            onChange={(e) => changeStudentName(e.target.value, index)}
          />
        </div>
      ))}
    </>
  );
}
