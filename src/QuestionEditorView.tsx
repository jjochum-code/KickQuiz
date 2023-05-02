import React, { useState } from "react";
import { IQuestions } from "./interfaces";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { QuestionList } from "./QuestionList";
import { produce } from "immer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { SaveQuestions } from "./SaveQuestions";
import {
  Typography,
  Box,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Button,
} from "@mui/material";
import { LoadQuestionsButton } from "./LoadQuestionsButton";

interface IProps {
  questions: IQuestions[];
  setQuestions: Function;
}

export function QuestionEditorView({
  questions,
  setQuestions,
}: IProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      <br />
      <div>
        <Typography variant="h2" component="h2">
          Fragen und Antworten
        </Typography>
        <br />
        <Box sx={{ display: "flex", gap: 2 }} paddingBottom={2}>
          <Box sx={{ flexGrow: 1, flexBasis: 1 }}>
            <LoadQuestionsButton setQuestions={setQuestions} />
          </Box>
          <Box sx={{ flexGrow: 1, flexBasis: 1 }}>
            <SaveQuestions questions={questions} />
          </Box>
        </Box>
        <Accordion
          disableGutters={true}
          expanded={isOpen}
          onChange={() => setIsOpen((prev) => !prev)}
          sx={{
            border: "none", // Remove border
            boxShadow: "none", // Remove box-shadow
            background: "transparent", // Set background to transparent
          }}
        >
          <AccordionSummary
            //expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ display: "flex", padding: 0 }}
          >
            <Button sx={{ flexGrow: 1 }} variant={"contained"}>
              <ArrowBackIosNewIcon
                sx={{
                  transform: isOpen ? "rotate(270deg)" : "rotate(90deg)",
                  transition: (theme) =>
                    theme.transitions.create("transform", {
                      duration: theme.transitions.duration.complex,
                    }),
                }}
              />
              <Box
                sx={{
                  width: "300px",
                  textAlign: "left",
                }}
              >
                &nbsp;&nbsp; Fragen und Antworten{" "}
                {isOpen ? "ausblenden" : "anzeigen"}
              </Box>
            </Button>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
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
              <PlaylistAddIcon /> &nbsp;&nbsp; Frage hinzufügen
            </Button>
          </Box>
        </Accordion>
      </div>
    </div>
  );
}
