import React from "react";
import { IQuestions } from "./interfaces";
import { Paper } from "@mui/material";

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
    <div>
      {questions.map(({ q, a }, index) => (
        <>
          <Paper elevation={3} key={index}>
            <div>Frage:</div>
            <div>
              <input
                value={q}
                style={{ minWidth: "750px" }}
                onChange={(e) => editQuestion(index, e.target.value)}
              />
            </div>
            <div>Antwort:</div>
            <div>
              <input
                value={a}
                style={{ minWidth: "750px" }}
                onChange={(e) => editAnswer(index, e.target.value)}
              />
            </div>
          </Paper>
          <button onClick={() => deleteQuestion(index)}> X</button>
          <br />
        </>
      ))}
    </div>
  );
}
