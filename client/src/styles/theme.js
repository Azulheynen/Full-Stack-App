import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#606c38", // dark moss green
      contrastText: "#fefae0", // cornsilk for text contrast
    },
    secondary: {
      main: "#283618", // pakistan green
      contrastText: "#fefae0", // cornsilk for text contrast
    },
    background: {
      default: "#fefae0", // cornsilk as the default background
      paper: "#ffffff", // white for paper background
    },
    text: {
      primary: "#283618", // pakistan green for primary text
      secondary: "#606c38", // dark moss green for secondary text
    },
    error: {
      main: "#bc6c25", // tigers eye for error
    },
    warning: {
      main: "#dda15e", // earth yellow for warning
    },
    info: {
      main: "#283618", // pakistan green for info
    },
    success: {
      main: "#606c38", // dark moss green for success
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fefae0", // cornsilk
          color: "#283618", // pakistan green
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#606c38", // dark moss green
          transition: "color 0.3s ease",
          "&:hover": {
            color: "#bc6c25", // tigers eye on hover
          },
        },
      },
    },
  },
});

export default theme;
