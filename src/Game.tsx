import React, { useState, useEffect } from "react";
import "./Game.css";
import { produce } from "immer";
import { IConfig } from "./EduBallFileEditor";

function Game() {
  const [ballPosition, setBallPosition] = useState<number>(0);

  const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "ArrowRight") {
      setBallPosition(() => (ballPosition + 1) % 6);
    }
    if (event.code === "ArrowLeft") {
      setBallPosition(() => (ballPosition - 1) % 6);
    }
  };
  return (
    <div className="background" onKeyDown={keyDownEvent} tabIndex={0}>
      {ballPosition}
      {<Ball ballPosition={ballPosition} />}
    </div>
  );
}

function Ball({ ballPosition }: { ballPosition: number }) {
  let ballStyle = "";
  if (ballPosition == -2) {
    //Hase2 schieß
    ballStyle = "FeldHase2-TorHase 1s ease-in-out 1 forwards";
  } else if (ballPosition == -1) {
    //Hase1 schießt
    ballStyle = "FeldHase1-FeldHase2 1s ease-in-out 1 forwards";
  } else if (ballPosition == 0) {
    //Mitte
    ballStyle = "Mitte-FeldHase1 1s ease-in-out 1 forwards";
  } else if (ballPosition == 1) {
    //Maus1 schießt
    ballStyle = "FeldMaus1-Mitte 1s ease-in-out 1 forwards";
  } else if (ballPosition == 2) {
    //Maus2 schießt
    ballStyle = "FeldMaus2-FeldMaus1 1s ease-in-out 1 forwards";
  }
  return <div id="SpielBall" style={{ animation: ballStyle }}></div>;
}

export default Game;
