import { Fragment } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 임포트

import HeaderCartButton from "./HeaderCartButton";
import closetImage from "../../assets/closet.jpg";
import logo from "../../img/OtPishAI_dark.png";
import classes from "./css/Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logoImg}>
          <Link to="/"> {/* 로고 클릭 시 홈으로 이동 */}
            <img src={logo} alt="OtpishAI logo" />
          </Link>
        </div>
        <div></div>
        <div></div>
        <HeaderCartButton onClick={props.onShowCart} />
        <div></div>
      </header>
      <div className={classes["main-image"]}>
        <img src={closetImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
