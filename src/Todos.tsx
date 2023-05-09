import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const XLi = styled("li")({
  textDecoration: "line-through",
});

export function Todos(): JSX.Element {
  return (
    <>
      <Typography variant="h4" component="h4">
        Todos
      </Typography>
      <ul>
        <li>a) add decent keys to students and questions</li>
        <li>b) add auto animate</li>
        <li>move components to appropriate folders</li>
        <XLi>store dark mode in local storage</XLi>
        <li>check components, refactor if necessary</li>
        <li>refactor changeTeamBlue and same for red</li>
        <li>remove all errors from log</li>
        <li>add version number to package.json and browser log</li>
        <XLi>remove paper behind questions</XLi>
        <XLi>move add student button outside of paper</XLi>
        <XLi>make headlines bold</XLi>
      </ul>
    </>
  );
}
