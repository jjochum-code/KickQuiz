import React, { useState } from "react";
import "./App.css";
import { EduBallFileEditor } from "./EduBallFileEditor";
import { FootballField } from "./FootballField";
import { LoadGame } from "./LoadGame";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IConfig } from "./interfaces";
import { ThemeSetter } from "./ThemeSetter";

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
  const [loadedConfig, setLoadedConfig] = useState<IConfig>(exampleConfig);

  return (
    <ThemeSetter>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
              path="/editor"
              element={
                <EduBallFileEditor
                  loadedConfig={loadedConfig}
                  setLoadedConfig={setLoadedConfig}
                />
              }
            />
            <Route path="/" element={<LoadGame />} />
            <Route path="/footballfield" element={<FootballField />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeSetter>
  );
}

export default App;
