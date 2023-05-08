import React, { useState } from "react";
import { CssBaseline, ThemeProvider, alpha } from "@mui/material";
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
        sx={{
          // this button is a one-of-its-kind, so it gets a very individual styling
          position: "fixed",
          top: "6px",
          right: "6px",
          zIndex: 10,
          color: "primary",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.7),
          borderRadius: "50%", // Round the background
          padding: "6px", // Add padding to adjust the size of the round background
          transition: (theme) =>
            `background-color ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeInOut}, ` +
            `color ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeInOut}`,
          "&:hover": {
            backgroundColor: "primary.main", // Set the background color on hover
            color: "common.black",
          },
        }}
        color="primary"
      >
        {theme === lightTheme ? <NightsStayIcon /> : <LightModeIcon />}
      </IconButton>
      {children}
    </ThemeProvider>
  );
}
