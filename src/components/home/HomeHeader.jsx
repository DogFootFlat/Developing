import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/OtPishAI_light.png";
import classes from "./css/homeheader.module.css";
import AuthContext from "../../store/auth-context";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HomeHeader = (props) => {
  const authCtx = useContext(AuthContext); // AuthContext 사용

  const logoutHandler = () => {
    authCtx.onLogout(); // 로그아웃 처리
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logoImg}>
          <img src={logo} alt="OtpishAI logo" />
        </div>
        <div className={classes.nav}>
          {!authCtx.isLoggedIn ? (
            <>
              <Link to="./sign-in">로그인</Link>
              <Link to="./sign-up">회원가입</Link>
              {/* FIXME: 임시로직 */}
              <Link to="/my-page" className={classes.userIcon}>
                <AccountCircleIcon style={{marginTop: '10px'}} />
              </Link>
            </>
          ) : (
            <>
              <Link to="/my-page" className={classes.userIcon}>
                <AccountCircleIcon style={{marginTop: '10px'}}/>
              </Link>
              <button className={classes.logoutBtn} onClick={logoutHandler}>
                로그아웃
              </button>
            </>
          )}
        </div>
      </header>
    </Fragment>
  );
};

export default HomeHeader;
