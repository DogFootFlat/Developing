import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";
import navcss from "../../css/navbar.module.css";

const NavBar = (props) => {
  const { window } = props;
  const ctx = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenToggle = () => {
    setMenuOpen((prevState) => !prevState);
  }

  const menu = (
    <Box className={navcss.menu} onClick={menuOpenToggle}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to={'/'}>
          <Button>처 음 으 로</Button>
        </Link>
      </Typography>
      <Divider />
      <List className={navcss.list}>
        <ListItem disablePadding>
          <Link to={'/books'}>
            <ListItemButton>
              <div>도 서 목 록</div>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={'/add-book'}>
            <ListItemButton>
              <div>도 서 추 가</div>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={'/loan-count'}>
            <ListItemButton>
              <div>도 서 대 여 통 계</div>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={'/users'}>
            <ListItemButton>
              <div>회 원 목 록</div>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={'/add-user'}>
            <ListItemButton>
              <div>회 원 추 가</div>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {/* <AppBar position="static">
        <Toolbar className={navcss.nav} sx={{ height: "1em" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Menu"
            onClick={menuOpenToggle}
            sx={{ width: "1.5em", margin: "0 0.1em" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={navcss.typobtn} variant="h6">
            {ctx.currentPage === "books" && "도서 목록"}
            {ctx.currentPage === "add-book" && "도서 추가"}
            {ctx.currentPage === "edit-book" && "도서 편집"}
            {ctx.currentPage === "loan-count" && "도서 대여 통계"}
            {ctx.currentPage === "users" && "회원 목록"}
            {ctx.currentPage === "add-user" && "회원 추가"}
            {ctx.currentPage === "edit-user" && "회원 편집"}
          </Typography>
          <Button className={navcss.loginbtn} color="inherit">
            로그인
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={menuOpen}
          onClose={menuOpenToggle}
          sx={{
            display: 'block',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {menu}
        </Drawer>
      </Box> */}
    </>
  );
};

const color = { color: "white" };
export default NavBar;
