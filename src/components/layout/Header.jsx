import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/closet.jpg";
import logo from "../../img/OtPishAI_dark.png"
import classes from "./css/Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className = {classes.logoImg}>
          <img src={logo} alt="OtpishAI logo" />
        </div>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicous food!" />
      </div>
    </Fragment>
  );
};

export default Header;
