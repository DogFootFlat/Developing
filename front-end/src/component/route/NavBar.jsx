import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import navcss from "./css/navcss.module.css";

const NavBar = () => {
  const ctx = useContext(AuthContext);
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
              <Link to={ctx.currentPage === "user" ? "/books" : "/users"} style={color}>
                {ctx.currentPage === "user" && "BOOK"}
                {ctx.currentPage === "book" && "USER"}
              </Link>
            </IconButton>
          </div>
          <IconButton className={navcss.arrowicon} disabled={true}>
            <ArrowForwardIosSharpIcon />
          </IconButton>
          <Typography className={navcss.typobtn} variant="h6">
            {ctx.currentPage === "user" && "회원 목록"}
            {ctx.currentPage === "book" && "도서 목록"}
          </Typography>
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
