import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    background: {
      default: "#222222",
    },
    mode: "dark",
    primary: { main: "#f5f5f1" },
    secondary: { main: "#e50914" },
    text: { primary: "#f5f5f1" },
  },
});

export const lightTheme = createTheme({
  palette: {
    background: {
      default: "#f5f5f1",
    },
    mode: "light",
    primary: { main: "#222222" },
    secondary: { main: "#e50914" },
    text: { primary: "#222222" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#f5f5f1",
        },
      },
    },
  },
});
