import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoadGame.css";

import { IConfig } from "./interfaces";

export function LoadGame() {
  // the size of the window in the begginning
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // we use the useEffect hook to listen to the window resize event
  useEffect(() => {
    window.onresize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  });

  const navigate = useNavigate();

  function calcStyle() {
      return {transform: "scale(" + windowSize.width / 1920 + ")"}
      }
        // <input type="buttin" id="input" size={200} onClick={() => navigate("/editor")} />

  return (
    <div id="Startseite" style={calcStyle()}>
      <div id="Wolke8"></div>
      <div id="Wolke4"></div>
      <div id="Wolke2"></div>
      <div id="Wolke6"></div>
      <div id="Wolke7"></div>
      <div id="Wolke3"></div>
      <div id="Wolke1"></div>
      <div id="Wolke5"></div>

      <div id="StartseiteHGPlatz"></div>
      <div id="StartseiteGras"></div>
      <div id="StartseiteLogo"></div>
      <div id="StartseiteSchiri"></div>

        <label className="Fileloader" onClick={() => navigate("/editor")}><h2>LOS GEHT'S!</h2></label>
    </div>
  );
}
