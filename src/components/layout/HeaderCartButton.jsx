import { useContext, useState, useEffect } from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../product/cart/CartIcon";
import classes from "./css/HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) { return; }
    setBtnIsHighLighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);
    return () => { clearTimeout(timer); };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>CART</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
