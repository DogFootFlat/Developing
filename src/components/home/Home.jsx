import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiService from '../../ApiService';
import styles from './css/home.module.css';  // 모듈 CSS 불러오기

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 상품을 가져오는 함수
  const fetchProductsHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.fetchProducts();
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Something went wrong!');
      }
      const data = response.data?.content || [];
      setProducts(data);

      // judge가 높은 3개 상품만 필터링
      const topProducts = data
        .sort((a, b) => b.judge - a.judge) // judge 기준으로 내림차순 정렬
        .slice(0, 3); // 상위 3개 선택
      setFeaturedProducts(topProducts);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 상품을 가져옴
  useEffect(() => {
    fetchProductsHandler();
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* 로그인 버튼 */}
      <div className={styles.login}>
        <Link to='/sign-in'><button>로그인</button></Link>
      </div>

      {/* 배너 섹션: judge가 높은 3개 상품 */}
      <div className={styles.banner}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {featuredProducts.length > 0 && (
          <div className={styles.featuredBanner}>
            {featuredProducts.map((product) => (
              <div key={product.id} className={styles.featuredItem}>
                <img src={product.imageUrl} alt={product.name} />
                <div>{product.name}</div>
                <div>₩{product.price.toLocaleString()}</div>
                {product.discountPrice && (
                  <div>
                    <span className={styles.discountPrice}>₩{product.discountPrice.toLocaleString()}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 나머지 콘텐츠 */}
      <div className={styles.categoryMenu}>
        <div>남성 의류</div>
        <div>여성 의류</div>
        <div>액세서리</div>
      </div>

      <div className={styles.featuredProducts}>
        <h2>추천 상품</h2>
        <div className={styles.productList}>
          {/* 추가 상품 리스트 구현 */}
        </div>
      </div>

      {/* 시계 섹션 */}
      <div className={styles.clock}>
        {/* 시계 구현 */}
      </div>
    </div>
  );
};

export default Home;
