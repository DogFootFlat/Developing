import React  from 'react';
import { Link } from 'react-router-dom';
import commoncss from '../css/common.module.css';
import myborrow from '../css/myborrow.module.css';
import homeicon from '../img/homeicon.png';
import loginicon from '../img/loginicon.png';
import book from '../img/book.jpg'

function MyBorrow() {
  return (
    <div className="Client">
      <header className={commoncss.common}>
        <div className={commoncss.subtitle}>
          <h2>전자책</h2>
        </div>
        <div className={commoncss.topnav}>
          <ul>
            <li><Link to={'/main'}><img src={homeicon} alt="home icon"/></Link></li>
            <li>&#10217;</li>
            <li><Link to={'/client'}>나의 도서관</Link></li>
            <li>&#10217;</li>
            <li><Link to={'/borrow'}>대출 현황</Link></li>
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
        
        <div className={myborrow.content}>
          <h1>대출 현황</h1><hr/>
          <div className={myborrow.bookprofile}>
              <div className={myborrow.loannum}><b>1</b> 권의 대출 이력이 있습니다.</div>
              <div className={myborrow.lateday}> 현재 연체 일자 : <b>0</b>일</div>
          </div>

          <div className={myborrow.loanbook}>
            <img src={book} alt="book"/>
            <div className={myborrow.bookinfo}>
              <h3>로마인에게 배우는 경영의 지혜</h3>
              <ul><li className={myborrow.bdleft}>김경준 저</li><li>메이트북스</li><li>2019년 7월</li></ul><br/>
              <div className={myborrow.bookplot}>
                천년제국 로마의 역사는 21세기 미래학이다! 현대의 조직은 문명이 발전시킨 첨단기술과 선진제도를 받아들여 운영되지만 수천년 전의 조직과 마찬가지로 인간의 본능에 따른 한계조건을 벗어나지 못하는
                경우가 많다. 21세기 조직이 리더십, 지배구조, 운영원칙, 역할분담 등 다양한 분야에서 역사적 인물과 공동체를 벤치마킹하는 이유이다. 천년제국 로마는 이러한…
              </div>
              <ul><li className={myborrow.bdleft}>대출일 : 2022-04-15</li><li>반납일 : <b>2022-04-22</b></li></ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyBorrow;
