import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../ApiService'; // ApiService 경로에 맞게 조정
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

            let sortedProducts = [];

            // judge가 높은 상품을 찾기
            const judgeProducts = data.filter(product => product.judge !== "NULL");

            if (judgeProducts.length > 0) {
                sortedProducts = judgeProducts
                    .sort((a, b) => b.judge - a.judge) // judge 기준 내림차순 정렬
                    .slice(0, 3); // 상위 3개 상품만 선택
            } else {
                // judge가 NULL인 상품을 맨 앞 3개로 선택
                sortedProducts = data.slice(0, 3);
            }

            setFeaturedProducts(sortedProducts);
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
            <div className={classes.login}>
                <Link to={'./sign-in'}>
                    <button>로그인</button>
                </Link>
                <Link to={'./sign-up'}>
                    <button>회원가입</button>
                </Link>
            </div>

            {/* 배너 섹션 */}
            <div className={classes.banner}>
                {isLoading && <p>로딩 중...</p>}
                {error && <p>{error}</p>}
                {!isLoading && !error && featuredProducts.length > 0 && (
                    <div className={classes.featuredProducts}>
                        <h2>추천 상품</h2>
                        <div className={classes.productList}>
                            {featuredProducts.map(product => (
                                <div key={product.productCode} className={classes.productItem}>
                                    <Link to={`/products/${product.productCode}`} className={classes.imageContainer}>
                                        <img src={product.productImg[0]} alt={product.productName} />
                                    </Link>
                                    <div>{product.productName}</div>
                                    {product.rprice > 0 ? (
                                        <>
                                            <div className={classes.originalPrice}>
                                                {product.oprice.toLocaleString()} 원
                                            </div>
                                            <div className={classes.discountWrapper}>
                                                <span className={classes.discountPercentage}>
                                                    {Math.round(((product.oprice - product.rprice) / product.oprice) * 100)}%
                                                </span>
                                                <span className={classes.salePrice}>{product.rprice.toLocaleString()} 원</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className={classes.salePrice}>{product.oprice.toLocaleString()} 원</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
