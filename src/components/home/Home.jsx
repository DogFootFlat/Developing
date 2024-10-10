import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../ApiService'; // ApiService 경로에 맞게 조정
import closetImage from '../../assets/closet.jpg';
import classes from './css/home.module.css'; // CSS 모듈 임포트

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.fetchProducts(); // queryString 없이 fetch
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Something went wrong!');
      }
      const data = response.data?.content || [];

      // judge가 높은 상품을 찾기
      const sortedProducts = data
        .filter((product) => product.judge !== 'NULL') // judge가 NULL이 아닌 상품만 필터링
        .sort((a, b) => b.judge - a.judge) // judge 기준 내림차순 정렬
        .slice(0, 3); // 상위 3개 상품만 선택

      if (sortedProducts.length === 0) {
        // judge가 NULL인 경우 첫 3개 상품 선택
        setFeaturedProducts(data.slice(0, 3));
      } else {
        setFeaturedProducts(sortedProducts);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]);

  return (
    <div className={classes.homeContainer}>
      {/* 헤더 */}
      <header className={classes.header}>
        <h1>옷피셜</h1>
        <nav className={classes.nav}>
          <Link to={'./sign-in'}>로그인</Link>
          <Link to={'./sign-up'}>회원가입</Link>
        </nav>
      </header>

      {/* 배너 섹션 */}
      <div className={classes.banner}>
        <div className={classes.overlay}></div>
        <h2>환영합니다! 다양한 상품을 만나보세요.</h2>
        <img src={closetImage} alt="A table full of delicous food!" className={classes.bannerImage} />
      </div>

      {/* 카테고리 메뉴 */}
      <div className={classes.categoryMenu}>
        <Link to="/category1">카테고리 1</Link>
        <Link to="/category2">카테고리 2</Link>
        <Link to="/category3">카테고리 3</Link>
        <Link to="/category4">카테고리 4</Link>
      </div>

      {/* 추천 상품 섹션 */}
      <div className={classes.featuredProducts}>
        <h2>추천 상품</h2>
        {isLoading && <p>로딩 중...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && (
          <div className={classes.productList}>
            {featuredProducts.map((product) => (
              <div key={product.productCode} className={classes.productItem}>
                <Link to={`/products/${product.productCode}`} className={classes.imageContainer}>
                  <img src={product.productImg[0]} alt={product.productName} className={classes.productImage} />
                </Link>
                <h3 className={classes.productName}>{product.productName}</h3>
                {product.rprice > 0 ? (
                  <>
                    <div className={classes.originalPrice}>{product.oprice.toLocaleString()} 원</div>
                    <div className={classes.discountWrapper}>
                      <span className={classes.discountPercentage}>{Math.round(((product.oprice - product.rprice) / product.oprice) * 100)}%</span>
                      <span className={classes.salePrice}>{product.rprice.toLocaleString()} 원</span>
                    </div>
                  </>
                ) : (
                  <div className={classes.salePrice}>{product.oprice.toLocaleString()} 원</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 푸터 */}
      <footer className={classes.footer}>
        <p>© 2024 옷피셜. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
