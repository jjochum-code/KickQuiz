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
      {/* Not sure if this is a good idea... */}
      <style>
        {`
          @keyframes expandPaper {
            0% {
              max-height: 0;
            }
            100% {
              max-height: 145px;
            }
          }
        `}
      </style>
      {questions.map(({ q, a }, index) => (
        <Box paddingY={1}>
          <Paper
            key={index}
            sx={{
              overflow: "hidden",
              animation: (theme) => `
              expandPaper ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut} forwards
            `,
            }}
          >
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
