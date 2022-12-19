import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import navcss from "./css/navcss.module.css";

const NavBar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar className={navcss.nav}>
          <div className={navcss.homearea}>
            <IconButton
              className={navcss.homebtn}
              edge="start"
              color="inherit"
              aria-label="Home"
            >
              <Link to={"/"} style={color}>
                HOME
              </Link>
            </IconButton>
          </div>
          <IconButton className={navcss.arrowicon} color="inherit">
            <ArrowForwardIosSharpIcon />
          </IconButton>
          <Typography className={navcss.typobtn} variant="h6">
            {/* 조건부 컨텐츠 사용 */}
            <Link to={"/users"} style={color}>
              회원 목록
            </Link>
          </Typography>
          {/* 조건부 컨텐츠 사용 */}
          <Button className={navcss.loginbtn} color="inherit">
            로그인
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

const color = { color: "white" };
export default NavBar;
