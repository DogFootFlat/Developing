import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  InputBase, 
  Box
} from '@mui/material';
import { ShoppingCart, Search, Menu } from '@mui/icons-material';
import CartContext from '../../store/cart-context';
import logo from '../../img/OtPishAI_dark.png';
import classes from './css/Header.module.css';

const Header = (props) => {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <AppBar position="sticky" className={`${classes.header} ${classes.backdropBlur}`}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" className={classes.logo}>
          <img src={logo} alt="Otfficial logo" className={classes.logoImage} />
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/" className={classes.navLink}>
            홈
          </Button>
          <Button color="inherit" component={Link} to="/products" className={classes.navLink}>
            제품
          </Button>
          <Button color="inherit" component={Link} to="/about" className={classes.navLink}>
            소개
          </Button>
          <Button color="inherit" component={Link} to="/contact" className={classes.navLink}>
            문의
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InputBase
            placeholder="검색..."
            className={classes.searchInput}
          />
          <IconButton color="inherit" className={classes.iconButton}>
            <Search />
          </IconButton>
        </Box>
        <IconButton color="inherit" className={classes.iconButton} onClick={props.onShowCart}>
          <ShoppingCart />
          <span className={classes.badge}>{numberOfCartItems}</span>
        </IconButton>
        <IconButton color="inherit" sx={{ display: { md: 'none' } }} className={classes.iconButton}>
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;