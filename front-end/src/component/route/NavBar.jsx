import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const NavBar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={style}>
            <a href="http://localhost:8081/" style={color}>HOME</a>
          </Typography>
          <Button color="inherit">로그인</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

const style = {
  flexGrow: 1,
};

const color = {
  color: "white",
};

export default NavBar;
