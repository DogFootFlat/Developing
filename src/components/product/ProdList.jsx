import { useState } from 'react';

import CartProvider from '../../store/CartProvider';
import Header from '../layout/Header';
import Cart from './cart/Cart';
import Products from './products/Products'
import { BottomNavigation, IconButton } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useNavigate } from 'react-router';

function ProdList() {
  const navigate = useNavigate();

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {/* <Item shoes={shoes} /> */}
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Products />
      </main>
      <BottomNavigation
        onClick={() => { navigate('/chatbot') }}
        sx={{
          position: 'fixed',
          right: '30px',
          bottom: '30px',
          width: '20px',
          height: '20px'
        }}
      >
        <IconButton
          sx={{
            width: '30px',
            height: '30px'
          }}>
          <SmartToyIcon color="primary" />
        </IconButton>
      </BottomNavigation>
    </CartProvider>
  );
}

export default ProdList;
