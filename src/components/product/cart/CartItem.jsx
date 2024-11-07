import { Typography, Box, Button } from '@mui/material';
import classes from './css/CartItem.module.css';

const CartItem = (props) => {
  const price = `${props.price.toLocaleString()} 원`;

  return (
    <li className={classes['cart-item']}>
      <Box>
        <Typography variant="h6">{props.name}</Typography>
        <Box className={classes.summary}>
          <Typography className={classes.price}>{price}</Typography>
          <Typography className={classes.amount}>x {props.amount}</Typography>
        </Box>
      </Box>
      <Box className={classes.actions}>
        <Button onClick={props.onRemove}>−</Button>
        <Button onClick={props.onAdd}>+</Button>
      </Box>
    </li>
  );
};

export default CartItem;