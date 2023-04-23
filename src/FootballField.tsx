import React, { useState, useRef, useEffect } from "react";
import "./FootballField.css";

export function FootballField() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const referee = useRef(null);
  const refereeSprite = useRef(null);

  const [introOver, setIntroOver] = useState(false);
  const [ballPos, setBallPos] = useState(900);
  const [scoreLeft, setScoreLeft] = useState(0);
  const [scoreRight, setScoreRight] = useState(0);

  useEffect(() => {
    setTimeout(startGame, 3000);
  }, []);

  function startGame() {
    setIntroOver(true);
    if (referee.current !== null) {
      (referee.current as any)!.style.animation =
        "SchiriAnpfiff 1s ease-in 5s 1 forwards";
      (refereeSprite.current as any)!.style.animation =
        "SchiriSprite 5s steps(9) 1 forwards";
    }
  }

  const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "ArrowRight") {
      if (ballPos >= 1500) {
        setScoreLeft((x) => x + 1);
        setBallPos(900);
        return;
      }
      setBallPos((prev) => {
        return prev + 200;
      });
    }
    if (event.code === "ArrowLeft") {
      //100
      if (ballPos <= 300) {
        setScoreRight((x) => x + 1);
        setBallPos(900);
        return;
      }
      setBallPos((prev) => {
        return prev - 200;
      });
    }
  };

  function ballStyle() {
    return { left: ballPos + "px" };
  }

  // we use the useEffect hook to listen to the window resize event
  useEffect(() => {
    window.onresize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  });

  function calcStyle() {
    return { transform: "scale(" + windowSize.width / 1920 + ")" };
  }

  function calcDisplayIntro() {
    return { display: introOver ? "none" : "" };
  }

  function calcDisplayGame() {
    return { display: introOver ? "" : "none" };
  }

  return (
    <div
      id="FootballField"
      style={calcStyle()}
      onKeyDown={keyDownEvent}
      tabIndex={0}
    >
      <div id="Intro" style={calcDisplayIntro()}>
        <div id="VS"></div>
        <div id="IntroHase"></div>
        <div id="IntroMaus"></div>
        <div id="LogoHase"></div>
        <div id="LogoMaus"></div>
      </div>

      <div id="Spiel" style={calcDisplayGame()}>
        <div id="Aufgabe">
          {" "}
          <span className="vertikalMitte">
            {" "}
            <h2 id="Aufgabenfeld">Aufgabe</h2>
          </span>
        </div>
        <div id="PunkteHase">
          <span className="vertikaleMitte">
            <h2 id="Hasenscore">{scoreLeft}</h2>
          </span>
        </div>
        <div id="PunkteMaus">
          <span className="vertikaleMitte">
            <h2 id="Mausscore">{scoreRight}</h2>
          </span>
        </div>

        <div className="FeldHase" id="FeldHase2"></div>
        <div className="FeldHase" id="FeldHase1"></div>
        <div className="FeldMaus" id="FeldMaus2"></div>
        <div className="FeldMaus" id="FeldMaus1"></div>
        <div id="TorHase"></div>
        <div id="TorMaus"></div>

        <div id="SpielBall" style={ballStyle()}></div>

        <div id="SpielSchiri" className="reset" ref={referee}>
          <span
            id="SpielSchiriSprite"
            className="reset"
            ref={refereeSprite}
          ></span>
        </div>

        <div id="SpielerHase">
          <span id="SpielerHaseSprite"></span>
        </div>
        <div id="SpielerMaus">
          <span id="SpielerMausSprite"></span>
        </div>
        <div id="SpielerNameHase">
          <h1 id="HaseNamensfeld"></h1>
        </div>
        <div id="SpielerNameMaus">
          <h1 id="MausNamensfeld"></h1>
        </div>

        <div id="Tooor"></div>
        <a
          id="Schlusspfiff"
          href="#"
          onClick={() => alert("PunkteStand(); return show('Sieg','Spiel');")}
        ></a>
      </div>
    </div>
  );
}
