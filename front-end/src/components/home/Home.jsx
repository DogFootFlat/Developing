import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../../store/auth-context";
import Login from "../login/Login";
import useInterval from "../basic/useInterval";
import homecss from './css/home.module.css';

const Home = () => {
  const ctx = useContext(AuthContext);
  const [loginIsShown, setLoginIsShown] = useState(false);
  const [caldrText, setCaldrText] = useState("2022년 00월 00일");
  const [timeText, setTimeText] = useState("00:00:00");

  const showLoginHandler = () => {
    setLoginIsShown(true);
  }
  const hideLoginHandler = () => {
    setLoginIsShown(false);
  }

  const getClock = () => {
    const date = new Date();
    const year = String(date.getFullYear()).padStart(2, "0") + '년';
    const mon = String(date.toLocaleString('ko-kr', { month: 'long' })).padStart(2, "0");
    const day = String(date.toLocaleString('ko-kr', { day: '2-digit' })).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    setCaldrText(year + ' ' + mon + ' ' + day);
    setTimeText(hours + ':' + minutes + ':' + seconds);
  }

  useEffect(() => {
    ctx.setCurrentPage("home");
    getClock();
  }, []);

  useInterval(() => {
    getClock();
  }, 1000)

  return (
    <div className={homecss.home}>
      <div className={homecss.login}>
        {loginIsShown && <Login onClose={hideLoginHandler} />}
        <button onClick={showLoginHandler}>로그인</button>
      </div>
      <div className={homecss.container__1}>
        <h1>SHELF-ER</h1>
        <div className={homecss.title__link}>
          <Link to={'/user-home'}>》회원화면</Link>
        </div>
        <div className={homecss.clock}>
          <div className={homecss.clock__caldr}>{caldrText}</div>
          <div className={homecss.clock__time}>{timeText}</div>
        </div>
      </div>
      <div className={homecss.container__2}>
        <div className={homecss.list}>
          <p>회원 기능</p>
          <p>
            <Link to={'/add-book'}>도 서 추 가</Link>
            <Link to={'/books'}>도 서 목 록</Link>
            <Link to={'/loan-count'}>도 서 대 여 통 계</Link>
            <Link to={'/'}>사용자 화면</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
