import React from "react";
import { LoadTeamsButton } from "./LoadTeamsButton";
import { StudentList } from "./StudentList";
import { produce } from "immer";
import { toggleDirections, IStudentTeam } from "./interfaces";
import { SaveTeamsButton } from "./SaveTeamsButton";
import { Box, Paper, Typography } from "@mui/material";

interface IProps {
  setTeamRed: Function;
  setTeamBlue: Function;
  teamBlue: IStudentTeam;
  teamRed: IStudentTeam;
}

export function StudentEditorView({
  setTeamBlue,
  teamBlue,
  setTeamRed,
  teamRed,
}: IProps): JSX.Element {
  function deleteStudent(teamSetter: Function) {
    return function (index: number) {
      teamSetter((baseState: IStudentTeam) => {
        const nextState = produce(baseState, (draftState: IStudentTeam) => {
          draftState.splice(index, 1);
        });
        return nextState;
      });
    };
  }

  function addStudent(teamSetter: Function) {
    return function (studentName: string = "") {
      teamSetter((prev: IStudentTeam) => [...prev, studentName]);
      console.debug(teamBlue);
    };
  }

  function toggleStudentTeam(direction: toggleDirections) {
    return function (index: number) {
      function toggle(
        index: number,
        fromTeam: IStudentTeam,
        fromTeamSetter: Function,
        toTeamSetter: Function
      ) {
        addStudent(toTeamSetter)(fromTeam[index]);
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
    };
  }

  //// ---------------------------------------------------------------------------------------------
  //// TODO deduplicate and rename
  function changeTeamBlue(studentname: string, index: number) {
    setTeamBlue((baseState: IStudentTeam) => {
      const nextState = produce(baseState, (draftState: IStudentTeam) => {
        draftState[index] = studentname;
      });
      return nextState;
    });
  }
  function changeTeamRed(studentname: string, index: number) {
    setTeamRed((baseState: IStudentTeam) => {
      const nextState = produce(baseState, (draftState: IStudentTeam) => {
        draftState[index] = studentname;
      });
      return nextState;
    });
  }
  //// ---------------------------------------------------------------------------------------------

  return (
    <>
      <br />
      <Typography variant="h4" component="h4">
        Todos
      </Typography>
      <ul>
        <li>a) add decent keys to students and questions</li>
        <li>b) add auto animate</li>
        <li>move components to appropriate folders</li>
        <li>store dark mode in local storage</li>
        <li>check components, refactor if necessary</li>
        <li>refactor changeTeamBlue and same for red</li>
        <li>
          <Typography sx={{ textDecoration: "line-through" }}>
            remove paper behind questions
          </Typography>
        </li>
        <li>
          <Typography sx={{ textDecoration: "line-through" }}>
            move add student button outside of paper
          </Typography>
        </li>
        <li>
          <Typography sx={{ textDecoration: "line-through" }}>
            make headlines bold
          </Typography>
        </li>
      </ul>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <Typography variant="h2" component="h2">
        Teams
      </Typography>
      <br />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          paddingBottom: 2,
        }}
      >
        <LoadTeamsButton
          setTeamRed={setTeamRed}
          setTeamBlue={setTeamBlue}
          sx={{ flexGrow: 1, flexBasis: 0 }}
        />
        <SaveTeamsButton
          teamBlue={teamBlue}
          teamRed={teamRed}
          sx={{ flexGrow: 1, flexBasis: 0 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Box sx={{ flexGrow: 1, flexBasis: 1 }}>
          <StudentList
            headline="Blaues Team"
            students={teamBlue}
            changeStudentName={changeTeamBlue}
            deleteStudent={deleteStudent(setTeamBlue)}
            addStudent={addStudent(setTeamBlue)}
            toggleStudentTeam={toggleStudentTeam("fromBlueToRed")}
            position="left"
          />
        </Box>
        <Box sx={{ flexGrow: 1, flexBasis: 1 }}>
          <StudentList
            headline="Rotes Team"
            students={teamRed}
            changeStudentName={changeTeamRed}
            deleteStudent={deleteStudent(setTeamRed)}
            toggleStudentTeam={toggleStudentTeam("fromRedToBlue")}
            addStudent={addStudent(setTeamRed)}
            position="right"
          />
        </Box>
      </Box>
    </>
  );
}
