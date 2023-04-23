import React, { useState, useRef, useEffect } from "react";
import "./Game.css";
import { produce } from "immer";

function Game() {
  const [ballPosition, setBallPosition] = useState<number>(3);

  const [leftScore, setLeftScore] = useState<number>(0);
  const [rightScore, setRightScore] = useState<number>(0);
  const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "ArrowRight") {
      setLeftScore(() => {
        return ballPosition + 1 <= 6 ? leftScore : leftScore + 1;
      });
      setBallPosition(() => {
        let newBallPos = ballPosition + 1;
        return newBallPos <= 6 ? newBallPos : 3;
      });
    }
    if (event.code === "ArrowLeft") {
      setRightScore(() => {
        return ballPosition - 1 >= 0 ? rightScore : rightScore + 1;
      });
      setBallPosition(() => {
        let newBallPos = ballPosition - 1;
        return newBallPos >= 0 ? newBallPos : 3;
      });
    }
  };
  return (
    <div className="background" onKeyDown={keyDownEvent} tabIndex={0}>
      {
        <PlaygroundContainer
          ballPosition={ballPosition}
          leftScore={leftScore}
          rightScore={rightScore}
        />
      }
    </div>
  );
}

/*-----------------Playground--------------------*/

function PlaygroundContainer({
  ballPosition,
  leftScore,
  rightScore,
}: {
  ballPosition: number;
  leftScore: number;
  rightScore: number;
}) {
  return (
    <div className="playgroundcontainer">
      {
        <Playground
          ballPosition={ballPosition}
          leftScore={leftScore}
          rightScore={rightScore}
        />
      }
    </div>
  );
}

function Playground({
  ballPosition,
  leftScore,
  rightScore,
}: {
  ballPosition: number;
  leftScore: number;
  rightScore: number;
}) {
  return (
    <div className="playground">
      {<QuestionBoard />}
      {<ScoreLeft score={leftScore} />}
      {<ScoreRight score={rightScore} />}
      {<Ball ballPosition={ballPosition} />}
    </div>
  );
}

function Ball({ ballPosition }: { ballPosition: number }) {
  type Coordinate = [string, string]; // Define a type alias for the tuple

  const coordinates: Coordinate[] = [
    // Define an array of coordinates
    ["61%", "5%"],
    ["58%", "20%"],
    ["50%", "34%"],
    ["61%", "47.5%"],
    ["72%", "60%"],
    ["68%", "75%"],
    ["58%", "86%"],
  ];
  const [top, left] = coordinates[ballPosition];

  return (
    <div className="ball" style={{ position: "absolute", top, left }}>
      <p className="cv_text">Ball</p>
    </div>
  );
}

/*-----------------Score and questions--------------------*/

function ScoreLeft({ score }: { score: number }) {
  return (
    <div className="score-left">
      <h2 className="score-text">{score}</h2>
    </div>
  );
}

function ScoreRight({ score }: { score: number }) {
  return (
    <div className="score-right">
      <h2 className="score-text">{score}</h2>
    </div>
  );
}

function QuestionBoard() {
  return (
    <div className="questionboard">
      <h2 id="questionboard-text">
        If a football team has gained 345 yards in their first 3 games of the
        season, what is their average yardage per game?
      </h2>
    </div>
  );
}

export default Game;
