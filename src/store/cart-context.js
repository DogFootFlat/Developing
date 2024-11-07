import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id, size) => {}, // size 매개변수 추가
});

export default CartContext;