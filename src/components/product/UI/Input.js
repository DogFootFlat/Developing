import React from 'react'

import classes from "./css/Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={`${classes.input} ${props.className}`}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
