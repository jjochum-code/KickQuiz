import React from "react";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Button, TextField, Box, Typography } from "@mui/material";
import { AddStudent } from "./Editor/Students/AddStudent";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface IStudentListProp {
  headline: string;
  students: string[];
  changeStudentName: Function;
  deleteStudent: Function;
  addStudent: () => void;
  toggleStudentTeam: Function;
  position: "left" | "right";
}

export function StudentList({
  headline,
  students,
  changeStudentName,
  deleteStudent,
  toggleStudentTeam,
  position,
  addStudent,
}: IStudentListProp) {
  const [animationParent] = useAutoAnimate();
  return (
    <>
      <Typography variant={"h4"} component={"h3"} padding={1} paddingBottom={3}>
        {headline} ({students.length})
      </Typography>
      <Box ref={animationParent}>
        {students.map((student, index) => (
          <Box key={student} sx={{ display: "flex" }} padding={1}>
            {position === "right" && (
              <>
                <Button
                  onClick={() => toggleStudentTeam(index)}
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
            <Button
              onClick={() => deleteStudent(index)}
              color={"warning"}
              variant="contained"
            >
              <PersonRemoveIcon />
            </Button>
            {position === "left" && (
              <>
                &nbsp;&nbsp;&nbsp;
                <Button
                  onClick={() => toggleStudentTeam(index)}
                  variant="contained"
                >
                  <KeyboardDoubleArrowRightIcon />
                </Button>
              </>
            )}
          </Box>
        ))}
      </Box>
      <AddStudent onClickCallBack={() => addStudent()} />
    </>
  );
}
