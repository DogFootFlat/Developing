import { useContext } from 'react';
import { Button, Typography, Box } from '@mui/material';
import CartContext from '../../../store/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import classes from './css/Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `${cartCtx.totalAmount.toLocaleString()} 원`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <Box className={classes.total}>
        <Typography variant="h6">Total Amount</Typography>
        <Typography variant="h6">{totalAmount}</Typography>
      </Box>
      <Box className={classes.actions}>
        <Button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </Button>
        {hasItems && (
          <Button className={classes.button} variant="contained">
            Order
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default Cart;