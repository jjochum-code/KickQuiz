import { createTheme, Theme, Palette } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    // terrible name
    buttonInvertColor: Palette["primary"];
    borderColor: Palette["primary"];
  }

  interface PaletteOptions {
    buttonInvertColor?: PaletteOptions["primary"];
    borderColor?: PaletteOptions["primary"];
  }
}

const basePalette = createTheme().palette;
const richBlack = "#010B13";

const lightPalette = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#306900",
    },
    secondary: {
      main: "#333438",
    },
    warning: {
      main: "#762200",
    },
    buttonInvertColor: {
      main: basePalette.common.white,
    },
    borderColor: {
      main: "rgba(0, 0, 0, 0.12)",
    },
  },
}).palette;

const darkPalette = createTheme({
  palette: {
    mode: "dark", // Set the theme mode to 'dark'
    text: {
      primary: "#b0afaf", // Light text color for dark theme
      secondary: "#bdbdbd", // Light secondary text color for dark theme
    },
    primary: {
      main: "#8bc34a",
    },
    secondary: {
      main: "#b0afaf",
    },
    warning: {
      main: "#ff9800",
    },
    background: {
      default: "#242424", // Dark background color
      paper: "#242424", // Dark paper color
    },
    buttonInvertColor: {
      main: richBlack,
    },
    borderColor: {
      main: "#5d5d5d",
    },
  },
}).palette;

const themeCreationFn = (activePalette: Palette) =>
  createTheme({
    palette: activePalette,
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
      // fontWeightLight: 300,
      // fontWeightRegular: 400,
      // fontWeightMedium: 500,
      // fontWeightBold: 700,
      h1: {
        fontWeight: 500, // Set the font weight for the h1
      },
      h2: {
        fontWeight: 500, // Set the font weight for the h2
      },
      h3: {
        fontWeight: 500, // Set the font weight for the h3
      },
      h4: {
        fontWeight: 500, // Set the font weight for the h4
      },
      h5: {
        fontWeight: 500, // Set the font weight for the h5
      },
      h6: {
        fontWeight: 500, // Set the font weight for the h6
      },
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
            borderColor: activePalette.borderColor.main, // You can customize the border color
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            fontSize: "18px", // Adjust the font size as needed
            fontWeight: 500,
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
            backgroundColor: activePalette.primary.main,
            border: "2px solid",
            borderColor: activePalette.primary.main,
            color: activePalette.buttonInvertColor.main,
            "&:hover": {
              backgroundColor: activePalette.buttonInvertColor.main,
              color: activePalette.primary.main,
            },
          },
          containedSecondary: {
            backgroundColor: activePalette.secondary.main,
            border: "2px solid",
            borderColor: activePalette.secondary.main,
            color: activePalette.buttonInvertColor.main,
            "&:hover": {
              backgroundColor: activePalette.buttonInvertColor.main,
              color: activePalette.secondary.main,
            },
          },
          containedWarning: {
            backgroundColor: activePalette.buttonInvertColor.main,
            border: "2px solid",
            borderColor: activePalette.buttonInvertColor.main,
            color: activePalette.warning.main,
            "&:hover": {
              backgroundColor: activePalette.warning.main,
              color: activePalette.buttonInvertColor.main,
            },
          },
          // Add more color variations as needed (e.g., warning, error, etc.)
        },
      },
    },
  });

export const lightTheme = themeCreationFn(lightPalette);
export const darkTheme = themeCreationFn(darkPalette);
