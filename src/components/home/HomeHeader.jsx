import { Fragment } from "react";
import { Link } from "react-router-dom"; // Link import 추가
import HeaderCartButton from "./HeaderCartButton";
import closetImage from "../../assets/closet.jpg";
import logo from "../../img/OtPishAI_dark.png";
import classes from "./css/homeheader.module.css";

const HomeHeader = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logoImg}>
          <img src={logo} alt="OtpishAI logo" />
        </div>
        <div className={classes.nav}>
          <Link to={'./sign-in'}>로그인</Link>
          <Link to={'./sign-up'}>회원가입</Link>
          <HeaderCartButton onClick={props.onShowCart} />
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={closetImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default HomeHeader;
