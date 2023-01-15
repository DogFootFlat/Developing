import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../store/auth-context";
import useInterval from "./basic/useInterval";
import homecss from './css/home.module.css';

const Home = () => {
  const ctx = useContext(AuthContext);
  const [caldrText, setCaldrText] = useState("2022년 00월 00일");
  const [timeText, setTimeText] = useState("00:00:00");

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
            <Link to={'/books'}>도 서 목 록</Link>
            {/* <Link to={'/books'}>도 서 위 치</Link>
            <Link to={'/books'}>도 서 기 부</Link>
            <Link to={'/books'}>도 서 추 천</Link> */}
            <Link to={'/'}>사용자 화면</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
