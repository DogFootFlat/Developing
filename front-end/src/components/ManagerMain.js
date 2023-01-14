import React  from 'react';
import { Link } from 'react-router-dom';
import maincss from '../css/main.module.css';
import usericon from '../img/usericon.png';

function Main() {
  document.body.style.backgroundColor = '#7196DB';
  return (
    <div className="Main">
      <header className={maincss.mainheader}>
        <ul className={maincss.login}>
          <li><Link to={'/'}>로그아웃</Link></li>
          <li><Link to={'/borrow'}><img src={usericon} alt="usericon"/></Link></li>
        </ul>
      </header>
      <section className={maincss.main}>
        <h1>&#128366;SHELF-ER</h1>
        <h3>관리자 페이지입니다.</h3>
        <li class={maincss.selected}><a href="start.html">시  작</a></li>
        <li><Link to={'/find'}>검  색</Link></li>
      </section>
    </div>
  );
}

export default Main;
