import React  from 'react';
import { Link } from 'react-router-dom';
import commoncss from '../css/common.module.css';
import clientcss from '../css/client.module.css';
import homeicon from '../img/homeicon.png';
import loginicon from '../img/loginicon.png';
import profileicon from '../img/profileicon.png'

function Client() {
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
            <li><Link to={'/client'}>내 정보</Link></li>
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
        
        <div className={clientcss.content}>
          <h1>내 정보</h1><hr/>
          <table className={clientcss.profile}>
            <tr>
              <th>프로필 사진</th>
              <td>
                <div className={clientcss.img}><img src={profileicon} alt="profile icon"/></div>
                <button>사진 변경</button><br/>
                <button className={clientcss.btncolor}>삭  제</button>
              </td>
            </tr>
            <tr>
              <th>별명</th>
              <td><input type="text" placeholder="내용을 입력해주세요"/></td>
            </tr>
          </table>
        </div>

        <div className={clientcss.button}>
          <button>적  용</button>
          <button className={clientcss.btncolor}>취  소</button>
        </div>
      </section>
    </div>
  );
}

export default Client;
