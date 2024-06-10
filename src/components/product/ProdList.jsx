import { useState } from 'react';

import CartProvider from '../../store/CartProvider';
import Header from '../layout/Header';
import Cart from './cart/Cart';
import Meals from './meals/Meals';

function ProdList() {
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
        <Meals />
      </main>
    </CartProvider>
  );
}

export default ProdList;
