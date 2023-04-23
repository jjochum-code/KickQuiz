import React from "react";
import { IQuestions } from "./interfaces";
import { LoadQuestions } from "./LoadQuestions";
import { QuestionList } from "./QuestionList";
import { produce } from "immer";
import { SaveQuestions } from "./SaveQuestions";
import {
  Typography,
  Box,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadStudentsButton } from "./LoadStudentsButton";

interface IProps {
  questions: IQuestions[];
  setQuestions: Function;
}

export function QuestionEditorView({
  questions,
  setQuestions,
}: IProps): JSX.Element {
  function addQuestion() {
    setQuestions((prev: IQuestions[]) => [...prev, { q: "", a: "" }]);
  }

  function deleteQuestion(index: number) {
    setQuestions((prev: IQuestions[]) => {
      const newState = [...prev];
      newState.splice(index, 1);
      return newState;
    });
  }

  function editAnswer(index: number, value: string) {
    setQuestions((prev: IQuestions[]) => {
      const nextState = produce(prev, (draftState) => {
        draftState[index].a = value;
      });
      return nextState;
    });
  }

  function editQuestion(index: number, value: string) {
    setQuestions((prev: IQuestions[]) => {
      const nextState = produce(prev, (draftState) => {
        draftState[index].q = value;
      });
      return nextState;
    });
  }

  return (
    <div>
      <br />
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h3" component="h2">
              Fragen und Antworten
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "100%" }} paddingRight={1} paddingY={1}>
                <LoadStudentsButton setQuestions={setQuestions} />
              </Box>
              <Box sx={{ width: "100%" }} paddingLeft={1} paddingY={1}>
                <SaveQuestions questions={questions} />
              </Box>
            </Box>
            <QuestionList
              questions={questions}
              deleteQuestion={deleteQuestion}
              editQuestion={editQuestion}
              editAnswer={editAnswer}
            />
          </AccordionDetails>
          <Box paddingX={2} paddingBottom={2} sx={{ minWidth: "100%" }}>
            <Button
              variant="contained"
              onClick={addQuestion}
              sx={{ minWidth: "100%" }}
            >
              +
            </Button>
          </Box>
        </Accordion>
      </div>
    </div>
  );
}
