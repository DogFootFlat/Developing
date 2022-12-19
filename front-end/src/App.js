import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./component/route/NavBar";
import AppRouter from "./component/route/RouterComponent";
import Container from "@material-ui/core/Container";
import style from "./css/common.css";

function App() {
  return (
    <BrowserRouter style={style}>
      <NavBar />
      <Container>
        <AppRouter />
      </Container>
    </BrowserRouter>
  );
}

export default App;
