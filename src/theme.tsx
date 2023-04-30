import { createTheme, Theme } from "@mui/material/styles";
import { Simulate } from "react-dom/test-utils";
import playing = Simulate.playing;

const palette = createTheme({
  palette: {
    primary: {
      main: "#306900",
    },
    secondary: {
      main: "#333438",
    },
    warning: {
      main: "#762200",
    },
  },
}).palette;

console.debug(palette);

const createMuiButtonOverrides = (theme: Theme) => ({
  root: {
    boxShadow: "none",
  },
  containedPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
    },
  },
  containedSecondary: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.secondary.main,
    },
  },
  // Add more color variations as needed (e.g., warning, error, etc.)
});

export const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: "2px solid",
          boxShadow: "none",
          borderColor: "rgba(0, 0, 0, 0.12)", // You can customize the border color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          backgroundColor: palette.primary.main,
          border: "2px solid",
          borderColor: palette.primary.main,
          color: palette.common.white,
          "&:hover": {
            backgroundColor: palette.common.white,
            color: palette.primary.main,
          },
        },
        containedSecondary: {
          backgroundColor: palette.secondary.main,
          border: "2px solid",
          borderColor: palette.secondary.main,
          color: palette.common.white,
          "&:hover": {
            backgroundColor: palette.common.white,
            color: palette.secondary.main,
          },
        },
        containedWarning: {
          backgroundColor: palette.common.white,
          border: "2px solid",
          borderColor: palette.common.white,
          color: palette.warning.main,
          "&:hover": {
            backgroundColor: palette.warning.main,
            color: palette.common.white,
          },
        },
        // Add more color variations as needed (e.g., warning, error, etc.)
      },
    },
  },
});

console.debug(palette);
