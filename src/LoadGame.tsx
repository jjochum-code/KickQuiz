import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IConfig } from "./interfaces";

export function LoadGame() {

    const navigate = useNavigate();

    return (
    <button onClick={() => navigate("/editor")}>Start game</button>
  );
  //console.log(
                  // ParseConfig(
                  //     setLoadedConfig,
                  //     "Frage: Wie viel Euro sind 100 cent? A: Keine Ahnung \nasd\n F: alösdj? A: aölsjdaslökj535 "
                  //     )

  // return (
  //   <button
  //     onclick={ParseConfig(
  //       setLoadedConfig,
  //       "Frage: Wie viel Euro sind 100 cent?\nA: Keine Ahnung\nasd\nF: alösdj?\nA: aölsjdaslökj535 "
  //     )}
  //   >
  //     Bitte wählen Sie eine Spieldatei aus:
  //   </button>
  // );
}
