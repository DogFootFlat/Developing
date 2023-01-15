import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../store/auth-context";
import useInterval from "./basic/useInterval";
import uhomecss from './css/uhome.module.css';

const UserHome = () => {
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
    ctx.setCurrentPage("user-home");
    getClock();
  }, []);

  useInterval(() => {
    getClock();
  }, 1000)

  return (
    <div className={uhomecss.home}>
      <div className={uhomecss.container__1}>
        <h1>
          <p className={uhomecss.title}>SHELF-ER</p>
          <p className={uhomecss.sub__title}>USER</p>
        </h1>
        <div className={uhomecss.title__link}>
          <Link to={'/'}>》도서화면</Link>
        </div>
        <div className={uhomecss.clock}>
          <div className={uhomecss.clock__caldr}>{caldrText}</div>
          <div className={uhomecss.clock__time}>{timeText}</div>
        </div>
      </div>
      <div className={uhomecss.container__2}>
        <div className={uhomecss.list}>
          <p>회원 기능</p>
          <p>
            <Link to={'/add-user'}>회 원 추 가</Link>
            <Link to={'/users'}>회 원 목 록</Link>
            {/* <Link to={'/books'}>기 부 내 역</Link> */}
            <Link to={'/user-home'}>사용자 화면</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
