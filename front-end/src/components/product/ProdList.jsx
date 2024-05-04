import { useState } from 'react';

import Cart from './cart/Cart';
import Header from '../layout/Header';
import Meals from './meals/Meals';
import CartProvider from '../../store/CartProvider';
import Item from './item/Item';

function ProdList() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const [shoes, setShoes] = useState([
    {
      src: '../../../img/book.jpg',
      title: '1',
      content: '일',
      price: 10000,
    },
  ]);

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
