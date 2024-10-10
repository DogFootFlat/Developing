import React from "react";
import { Link } from "react-router-dom";
import styles from './css/home.module.css';  // 모듈 CSS 불러오기
import closetImage from "../../assets/closet.jpg";

const Home = () => {
  return (
    <div className={styles['home-container']}>
      {/* 상단 배너 */}
      <div className={styles.banner}>
      <img src={closetImage} alt="A table full of delicous food!" />
      </div>

      {/* 카테고리 메뉴 */}
      <div className={styles['category-menu']}>
        <Link to="/category/men"><div>남성 의류</div></Link>
        <Link to="/category/women"><div>여성 의류</div></Link>
        <Link to="/category/accessories"><div>액세서리</div></Link>
      </div>

      {/* 추천 상품 섹션 */}
      <div className={styles['featured-products']}>
        <h2>추천 상품</h2>
        <div className={styles['product-list']}>
          <div className={styles['product-item']}>
            <img src="https://image.msscdn.net/images/goods_img/20240509/4118941/4118941_17152412559989_125.jpg" alt="상품1" />
            <div>상품 이름 1</div>
            <div>₩10,000</div>
          </div>
          <div className={styles['product-item']}>
            <img src="https://image.msscdn.net/images/goods_img/20240206/3851506/3851506_17072151403131_125.jpg" alt="상품2" />
            <div>상품 이름 2</div>
            <div>₩20,000</div>
          </div>
        </div>
      </div>

      {/* 로그인/회원가입 링크 */}
      <div className={styles['auth-links']}>
        <Link to='/sign-in'><div>로그인</div></Link>
        <Link to='/sign-up'><div>회원가입</div></Link>
      </div>

      {/* 상품 목록 보기 링크 */}
      <div className={styles['product-list-link']}>
        <Link to='/prod-list'><div>전체 상품 보러가기</div></Link>
      </div>
    </div>
  );
}

export default Home;
