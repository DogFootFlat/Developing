import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./store/auth-context";
import NavBar from "./components/route/NavBar";
import AppRouter from "./components/route/RouterComponent";
import Container from "@material-ui/core/Container";
import style from "./css/common.module.css";
import backimg from "./img/background.png";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <BrowserRouter style={style}>
      {!["home", "user-home"].includes(ctx.currentPage) && <NavBar />}
      <Container>
        <AppRouter />
      </Container>
    </BrowserRouter>
  );
}

export default App;
