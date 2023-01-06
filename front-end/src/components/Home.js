import React  from 'react';
import { Link } from 'react-router-dom';
import homecss from '../css/home.module.css';
import backimg from '../img/background.png';

function Home() {
  document.documentElement.style.width = '100%';
  document.body.style.backgroundImage = "url(" + backimg + ")"
  
  return (
    <div className="Home">
        <div className={homecss.container}>
            <h1 className={homecss.h1} style={{ color: '#FFF' }}>SHELF-ER</h1>
            <p className={homecss.p} style={{ color: '#FFF' }}>회원 기능</p>
            <ul className={homecss.ul} style={{ textAlign: 'right' }}>
              <li className={homecss.li}><Link to={'/mform'} className="link" style={{ color: '#FFF' }}>도 서 추 가</Link></li>
              <li className={homecss.li}><Link to={'/mlist'} className="link" style={{ color: '#FFF' }}>도 서 목 록</Link></li>
              <li className={homecss.li}><Link to={'/ebook'} className="link" style={{ color: '#FFF' }}>도 서 수 정</Link></li>
              <li className={homecss.li}><Link to={'/main'} className="link" style={{ color: '#FFF' }}>메 인 화 면</Link></li>
            </ul>
        </div>
    </div>
  );
}

export default Home;
