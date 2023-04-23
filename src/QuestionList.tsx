import React from "react";
import { IQuestions } from "./interfaces";
import { Paper, Grid, Input, TextField, Box } from "@mui/material";

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
    <Grid container spacing={2} xs={12}>
      {questions.map(({ q, a }, index) => (
        <Grid item xs={12}>
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
              <Box padding={1}>
                <button onClick={() => deleteQuestion(index)}>X</button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
