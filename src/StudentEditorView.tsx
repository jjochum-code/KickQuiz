import React from "react";
import { LoadTeamsButton } from "./LoadTeamsButton";
import { StudentList } from "./StudentList";
import { produce } from "immer";
import { toggleDirections } from "./interfaces";
import { SaveTeamsButton } from "./SaveTeamsButton";
import { Box, Paper, Typography } from "@mui/material";

interface IProps {
  setTeamRed: Function;
  setTeamBlue: Function;
  teamBlue: string[];
  teamRed: string[];
}

export function StudentEditorView({
  setTeamBlue,
  teamBlue,
  setTeamRed,
  teamRed,
}: IProps): JSX.Element {
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

  function addStudent(teamSetter: Function) {
    return function (studentName: string = "") {
      teamSetter((prev: string[]) => [...prev, studentName]);
      console.debug(teamBlue);
    };
  }

  function toggleStudentTeam(direction: toggleDirections) {
    return function (index: number) {
      function toggle(
        index: number,
        fromTeam: string[],
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
    setTeamBlue((baseState: string[]) => {
      const nextState = produce(baseState, (draftState: string[]) => {
        draftState[index] = studentname;
      });
      return nextState;
    });
  }
  function changeTeamRed(studentname: string, index: number) {
    setTeamRed((baseState: string[]) => {
      const nextState = produce(baseState, (draftState: string[]) => {
        draftState[index] = studentname;
      });
      return nextState;
    });
  }
  //// ---------------------------------------------------------------------------------------------

  return (
    <>
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box paddingRight={1} sx={{ flexGrow: 1, flexBasis: 1 }}>
          <Paper>
            <Box padding={1}>
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
          </Paper>
        </Box>
        <Box paddingLeft={1} sx={{ flexGrow: 1, flexBasis: 1 }}>
          <Paper>
            <Box padding={1}>
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
          </Paper>
        </Box>
      </Box>
    </>
  );
}
