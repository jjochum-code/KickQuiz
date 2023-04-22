import React, { useState } from "react";
import "./App.css";
import { EduBallFileEditor } from "./EduBallFileEditor";
import { LoadGame } from "./LoadGame";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IConfig } from "./interfaces";

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
  const[loadedConfig, setLoadedConfig] = useState();
  const[selectedFile, setSelectedFile] = useState();

  return (
  <BrowserRouter>
    <div className="App">
    <Routes>
    <Route path="/editor" element={<EduBallFileEditor selectedFile={selectedFile} setSelectedFile={setSelectedFile} loadedConfig={exampleConfig} setLoadedConfig={setLoadedConfig} />}/>
    <Route path="/" element={<LoadGame selectedFile={selectedFile} setSelectedFile={setSelectedFile} />}/>
    </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
