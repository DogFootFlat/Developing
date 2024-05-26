import React  from 'react';
import { Link } from 'react-router-dom';
import '../css/common.css';
import commoncss from '../css/common.module.css';
import borrowcss from '../css/borrow.module.css';
import homeicon from '../img/homeicon.png';
import loginicon from '../img/loginicon.png';
import searchicon from '../img/searchicon.png';

function Borrow() {
  document.body.style.backgroundColor = 'white';
  return (
    <div className="Borrow">
      <header className={commoncss.common}>
        <div className={commoncss.subtitle}>
          <h2>전자책</h2>
        </div>
        <div className={commoncss.topnav}>
          <ul>
            <li><Link to={'/main'}><img src={homeicon} alt="home icon"/></Link></li>
            <li>&#10217;</li>
            <li><Link to={'/borrow'}>자료 검색</Link></li>
          </ul>
        </div>
        <div className={commoncss.loginnav}>
          <ul>
            <li>○○○님,</li>
            <li><Link to={'/main'}>로그아웃</Link></li>
          </ul>
          <Link to={'/client'}><img src={loginicon} alt="login icon"/></Link>
        </div>
      </header>

      <section>
        <div className={commoncss.left}>
          <div className={`${commoncss.menu} ${commoncss.menu_margin}`}>
            <Link to={'/borrow'}><div className={commoncss.menu_title}>자료검색</div></Link>
          </div>
          <div className={commoncss.menu}>
          <Link to={'/'}><div className={commoncss.menu_title}>인기신간</div></Link>
            <ul>
              <li><Link to={'/'}>&#8226; 가정과 생활</Link></li>
              <li><Link to={'/'}>&#8226; 경제/비즈니스</Link></li>
              <li><Link to={'/'}>&#8226; 인문/사회</Link></li>
              <li><Link to={'/'}>&#8226; 역사</Link></li>
              <li><Link to={'/'}>&#8226; 자연/과학</Link></li>
              <li><Link to={'/'}>&#8226; 취미/건강/여행</Link></li>
              <li><Link to={'/'}>&#8226; 문화예술</Link></li>
            </ul>
          </div>
          <div className={commoncss.menu}>
            <Link to={'/client'}><div className={commoncss.menu_title}>나의 도서관</div></Link>
            <ul>
              <li><Link to={'/client'}>&#8226; 내 정보</Link></li>
              <li><Link to={'/myborrow'}>&#8226; 대출 현황</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={borrowcss.content}>
          <h1>자료검색</h1><hr/>
          
          <div className={borrowcss.findlist}>
            <select>
              <option value="0">장르 전체</option>
              <option value="1">가정과 생활</option>
              <option value="2">경제/비즈니스</option>
              <option value="3">인문/사회</option>
              <option value="4">역사</option>
              <option value="5">자연/과학</option>
              <option value="6">취미/건강/여행</option>
              <option value="7">문화예술</option>
            </select>
            <select>
              <option value="0">제목 검색</option>
              <option value="1">제목만</option>
              <option value="2">저자만</option>
              <option value="3">제목+저자</option>
            </select>
            <div className={borrowcss.searchbar}>
              <input type="text"/>
              <button className={borrowcss.searchbtn}><img src={searchicon} alt="searchicon"/></button>
            </div>
          </div>
          
          <div className={borrowcss.result}>
            <p>검색된 책이 없습니다.</p>
            <p>키워드를 입력해주세요!</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Borrow;
