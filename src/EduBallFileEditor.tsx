import React, { useState, useEffect } from "react";
import "./App.css";
import { IConfig, IQuestions } from "./interfaces";
import { Container } from "@mui/material";
import {
  locallyLoadData,
  locallySaveEditorData,
} from "./localLoadingFunctions";
import { StudentEditorView } from "./StudentEditorView";
import { QuestionEditorView } from "./QuestionEditorView";

export function EduBallFileEditor({
  loadedConfig,
  setLoadedConfig,
}: {
  loadedConfig: IConfig;
  setLoadedConfig: Function;
}) {
  const [questions, setQuestions] = useState<IQuestions[]>(
    loadedConfig.questions
  );
  const [teamRed, setTeamRed] = useState<string[]>(loadedConfig.students.red);
  const [teamBlue, setTeamBlue] = useState<string[]>(
    loadedConfig.students.blue
  );
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    const data = locallyLoadData();
    if (data) {
      setQuestions(data.questions);
      setTeamRed(data.students.red);
      setTeamBlue(data.students.blue);
    }
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      locallySaveEditorData(teamBlue, teamRed, questions);
    }
  }, [teamBlue, teamRed, questions, dataLoaded]);

  return (
    <Container>
      <StudentEditorView
        setTeamRed={setTeamRed}
        setTeamBlue={setTeamBlue}
        teamBlue={teamBlue}
        teamRed={teamRed}
      />
      <hr />
      <br />
      <QuestionEditorView setQuestions={setQuestions} questions={questions} />
      <br />
      <br />
    </Container>
  );
}
