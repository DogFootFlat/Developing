import React from "react";
import * as ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./store/auth-context";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ThemeProvider>
);
reportWebVitals();
