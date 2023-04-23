import React from "react";
import { toggleDirections } from "./interfaces";

interface IStudentListProp {
  students: string[];
  changeStudentName: Function;
  deleteStudent: Function;
  toggleStudentTeam: Function;
  toggleDirection: toggleDirections;
}

export function StudentList({
  students,
  changeStudentName,
  deleteStudent,
  toggleStudentTeam,
  toggleDirection,
}: IStudentListProp) {
  return (
    <>
      {students.map((student, index) => (
        <div key={index}>
          <input
            value={student}
            onChange={(e) => changeStudentName(e.target.value, index)}
          />
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => deleteStudent(index)}>X</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => toggleStudentTeam(index, toggleDirection)}>
            {" > "}
          </button>
        </div>
      ))}
    </>
  );
}
