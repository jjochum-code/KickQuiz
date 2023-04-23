import React from "react";
import { toggleDirections } from "./interfaces";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Button, TextField, Box } from "@mui/material";

interface IStudentListProp {
  students: string[];
  changeStudentName: Function;
  deleteStudent: Function;
  toggleStudentTeam: Function;
  toggleDirection: toggleDirections;
  position: "left" | "right";
}

export function StudentList({
  students,
  changeStudentName,
  deleteStudent,
  toggleStudentTeam,
  toggleDirection,
  position,
}: IStudentListProp) {
  return (
    <>
      {students.map((student, index) => (
        <Box key={index} sx={{ display: "flex" }} padding={1}>
          {position === "right" && (
            <>
              <Button
                onClick={() => toggleStudentTeam(index, toggleDirection)}
                variant="contained"
              >
                <KeyboardDoubleArrowLeftIcon />
              </Button>{" "}
              &nbsp;&nbsp;&nbsp;
            </>
          )}
          <TextField
            size="small"
            label={"Schüler_In"}
            sx={{ flex: 1 }}
            value={student}
            onChange={(e) => changeStudentName(e.target.value, index)}
          />
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => deleteStudent(index)}>X</button>
          {position === "left" && (
            <>
              &nbsp;&nbsp;&nbsp;
              <Button
                onClick={() => toggleStudentTeam(index, toggleDirection)}
                variant="contained"
              >
                <KeyboardDoubleArrowRightIcon />
              </Button>
            </>
          )}
        </Box>
      ))}
    </>
  );
}
