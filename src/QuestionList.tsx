import React from "react";
import { IQuestions } from "./EduBallFileEditor";

interface IQuestionListProps {
  questions: IQuestions[];
  deleteQuestion: Function;
}

export function QuestionList({
  questions,
  deleteQuestion,
}: IQuestionListProps) {
  return (
    <div>
      {questions.map(({ q, a }, index) => (
        <>
          <div key={index}>
            <div>Frage:</div>
            <div>
              <input value={q} style={{ minWidth: "750px" }} />
            </div>
            <div>Antwort:</div>
            <div>
              <input value={a} style={{ minWidth: "750px" }} />
            </div>
          </div>
          <button onClick={() => deleteQuestion(index)}> X</button>
          <br />
        </>
      ))}
    </div>
  );
}
