import React from "react";
import "./App.css";
import { EduBallFileEditor, IConfig } from "./EduBallFileEditor";

const exampleConfig: IConfig = {
  students: {
    red: ["Alice", "Bob", "Carol"],
    blue: ["David", "Eve", "Frank"],
  },
  questions: [
    {
      q: "What is the capital of France?",
      a: "Paris",
    },
    {
      q: "What is the square root of 64?",
      a: "8",
    },
    {
      q: "What is the chemical symbol for water?",
      a: "H2O",
    },
  ],
};

function App() {
  return (
    <div className="App">
      <EduBallFileEditor loadedConfig={exampleConfig} />
    </div>
  );
}

export default App;
