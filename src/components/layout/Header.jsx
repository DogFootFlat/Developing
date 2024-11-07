import { AccountCircle, Menu, Search, ShoppingCart } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, InputBase, Toolbar, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../img/OtPishAI_light.png';
import CartContext from '../../store/cart-context';
import Cart from '../product/cart/Cart';
import classes from './css/Header.module.css';

const Header = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const location = useLocation();

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const isHomePage = location.pathname === '/';

  const hideCartHandler = () => {
    props.setCartIsShown(false);
  };

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnClasses = `${classes.badge} ${btnIsHighlighted ? classes.bump : ''}`;

  return (
    <AppBar position="sticky" className={`${classes.header} ${classes.backdropBlur}`}>
      {props.cartIsShown && <Cart onClose={hideCartHandler} />}

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

        {isHomePage ? (
          <div className={classes.nav}>
            <Link to="./sign-in">로그인</Link>
            <Link to="./sign-up">회원가입</Link>
            <Link to="/my-page" className={classes.userIcon}>
              <AccountCircle style={{ marginTop: '10px' }} />
            </Link>
          </div>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <InputBase placeholder="검색..." className={classes.searchInput} />
              <IconButton color="inherit" className={classes.iconButton}>
                <Search />
              </IconButton>
            </Box>{' '}
            <IconButton color="inherit" className={classes.iconButton} onClick={props.onShowCart}>
              <ShoppingCart />
              <span className={btnClasses}>{numberOfCartItems}</span>
            </IconButton>
          </>
        )}
        <IconButton color="inherit" sx={{ display: { md: 'none' } }} className={classes.iconButton}>
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
