import React, { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/LightMode";
import { lightTheme, darkTheme } from "./theme";

interface IProps {
  children: JSX.Element;
}

export function ThemeSetter({ children }: IProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const handleThemeToggle = () => {
    setTheme((prev) => (prev === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IconButton
        onClick={handleThemeToggle}
        sx={{ position: "fixed", top: "6px", right: "6px" }}
        color="primary"
      >
        {theme === lightTheme ? <LightModeIcon /> : <NightsStayIcon />}
      </IconButton>
      {children}
    </ThemeProvider>
  );
}
