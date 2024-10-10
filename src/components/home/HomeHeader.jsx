import { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/OtPishAI_light.png";
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
        </div>
      </header>
    </Fragment>
  );
};

export default HomeHeader;
