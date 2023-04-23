import React, { useState, useRef, useEffect } from "react";
import "./Game.css";
import { produce } from "immer";

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
      {<LowerHalf />}
    </div>
  );
}

/*-----------------Score and questions aka upper 50% of the screen--------------------*/
function Questionbard() {
  return (
    <div className="questionboard">
      <div className="questionboardinner">
        <p>Centered text</p>
      </div>
    </div>
  );
}

/*-----------------Playground aka lower 50% of the screen--------------------*/

function LowerHalf() {
  return <div className="background_scale">{<Playground />}</div>;
}
function Playground() {
  /*ensure center of the playground is at 75% of the screen*/
  /*return <div className="playground"></div>;*/
  return <div className="playground_scale">{<Ball ballPosition={4} />}</div>;
}

function Ball({ ballPosition }: { ballPosition: number }) {
  const divRef = useRef<HTMLDivElement>(null);

  /*x and y are the percentage offset from the center of the playground to the edge of the screen */
  /*(or to the center of the screen in case of positive)*/
  let x = 0.4; /*negative = offset to left, positive = offset to right*/
  let y = 1; /*negative = offset down, positive = offset up (can be above 1)*/

  useEffect(() => {
    const setPagePosition = () => {
      const pageScale = window.devicePixelRatio;
      const pageWidth = window.innerWidth;
      const pageHeight = window.innerHeight;

      const div = divRef.current;
      if (div) {
        div.style.position = "absolute";
        let ball_size = (((pageWidth + pageHeight) / 2 - 250) / 10) * pageScale;
        div.style.left =
          (pageWidth - ball_size) / 2 + x * (pageWidth / 2) + "px";
        div.style.top =
          pageHeight * 0.75 - ball_size / 2 + -y * (pageHeight / 4) + "px";
        div.style.width = ball_size + "px";
        div.style.height = ball_size + "px";
      }
    };

    setPagePosition();

    window.addEventListener("resize", setPagePosition);

    return () => {
      window.removeEventListener("resize", setPagePosition);
    };
  }, [x, y]);

  return <div className="ball"></div>;
}

export default Game;
