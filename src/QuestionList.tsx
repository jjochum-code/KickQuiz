import React from "react";
import { IQuestions } from "./interfaces";
import { Paper, Grid, TextField, Box, Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface IQuestionListProps {
  questions: IQuestions[];
  deleteQuestion: Function;
  editQuestion: Function;
  editAnswer: Function;
}

export function QuestionList({
  questions,
  deleteQuestion,
  editQuestion,
  editAnswer,
}: IQuestionListProps) {
  return (
    <>
      {questions.map(({ q, a }, index) => (
        <Box paddingY={1}>
          <Paper elevation={3} key={index}>
            <Box
              padding={1}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Box padding={1} paddingTop={2}>
                  <TextField
                    size="small"
                    label={"Frage"}
                    value={q}
                    style={{ minWidth: "100%" }}
                    onChange={(e) => editQuestion(index, e.target.value)}
                  />
                </Box>
                <Box padding={1}>
                  <TextField
                    size="small"
                    label="Antwort"
                    value={a}
                    style={{ minWidth: "100%" }}
                    onChange={(e) => editAnswer(index, e.target.value)}
                  />
                </Box>
              </Box>
              <Box padding={1} paddingTop={2}>
                <Button
                  variant="contained"
                  onClick={() => deleteQuestion(index)}
                  color={"warning"}
                >
                  <DeleteOutlineIcon />
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      ))}
    </>
  );
}
