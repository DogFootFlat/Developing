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
  if (["home", "user-home"].includes(ctx.currentPage)) {
    document.body.style.backgroundImage = "url(" + backimg + ")";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "top center";
    document.body.style.backgroundSize = "cover";
    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundRepeat = "repeat";
    document.body.style.backgroundAttachment = "scroll";
    document.body.style.height = "auto";
    document.body.style.overflowY = "visible";
  }

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
