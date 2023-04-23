import React from "react";
import { IQuestions } from "./interfaces";
import { LoadQuestions } from "./LoadQuestions";
import { QuestionList } from "./QuestionList";
import { produce } from "immer";
import { SaveQuestions } from "./SaveQuestions";

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
      <LoadQuestions setQuestions={setQuestions} />
      <SaveQuestions questions={questions} />
      <br />
      <br />
      <h3>Fragen und Antworten</h3>
      <QuestionList
        questions={questions}
        deleteQuestion={deleteQuestion}
        editQuestion={editQuestion}
        editAnswer={editAnswer}
      />
      <div>
        <button onClick={addQuestion}> + </button>
      </div>
    </div>
  );
}
