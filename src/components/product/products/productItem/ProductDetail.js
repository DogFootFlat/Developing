import { Button } from '@mui/material'; // MUI Button for consistent theming
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../../../ApiService';
import styles from './css/ProductDetail.module.css';

const ProductDetail = () => {
    const { productNum } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await ApiService.fetchProductByNum(productNum);
                const data = response.data;
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productNum]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>상품을 찾을 수 없습니다.</div>;
    }

    // Calculate the discount percentage
    const getDiscountPercentage = (originalPrice, discountedPrice) => {
        if (originalPrice > discountedPrice && discountedPrice !== 0) {
            return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
        }
        return 0; // No discount
    };

    const discountPercentage = getDiscountPercentage(product.oprice, product.rprice);

    return (
        <div className={styles.productDetail}>
            {/* Header */}
            <div className={styles.productHeader}>
                <button className={styles.backButton} onClick={() => navigate('/products')}>
                    ← 상품 목록
                </button>
            </div>

            {/* Image Carousel and Product Information in a flex container */}
            <div className={styles.carouselAndInfo}>
                {/* Image Carousel */}
                <div className={styles.carouselContainer}>
                    <div className={styles.productCarousel}>
                        {product.productImg.map((img, index) => (
                            <img key={index} src={img} alt={product.productName} className={styles.productImage} />
                        ))}
                    </div>
                </div>

                {/* Product Information */}
                <div className={styles.productInfo}>
                    <h1 className={styles.productName}>{product.productName}</h1>
                    <p className={styles.reviewLink}>리뷰 바로가기 ({product.review})</p>

                    <div className={styles.price}>
                        {product.rprice > 0 && product.rprice < product.oprice ? (
                            <>
                                <span className={styles.originalPrice}>
                                    {product.oprice} 원
                                </span>
                                <span className={styles.discountPrice}>할인가: {product.rprice} 원</span>
                                <span className={styles.discountPercentage}>(-{discountPercentage}%)</span>
                            </>
                        ) :
                            <span className={styles.discountPrice}>
                                {product.oprice} 원
                            </span>
                        }
                    </div>

                    <p className={styles.brand}>브랜드: {product.productBrand}</p>
                    <p className={styles.category}>카테고리: {product.category.join(', ')}</p>
                </div>
            </div>

            {/* Footer (fixed at the bottom) */}
            <div className={styles.footer}>
                <div className={styles.starRating}>⭐ 4.5/5</div>
                <Button className={styles.favoriteButton} variant="outlined" color="primary">
                    관심상품 등록
                </Button>
                <Button className={styles.buyButton} variant="contained" color="primary">
                    구매하기
                </Button>
            </div>

            {/* Sticky Navigation Bar */}
            <div className={styles.navbar}>
                <div className={styles.navItem}>상품 정보</div>
                <div className={styles.navItem}>리뷰</div>
                <div className={styles.navItem}>추천</div>
                <div className={styles.navItem}>문의</div>
            </div>

            {/* Product Details */}
            <div className={styles.productDetails}>
                <h2>상세 정보</h2>
                <ul>
                    {product.productDetails.map((detail, index) => (
                        <li key={index}>
                            <strong>사이즈:</strong> {detail.productSize}, 재고: {detail.productInven}개
                        </li>
                    ))}
                </ul>
            </div>

            {/* Reviews */}
            <div className={styles.reviews}>
                <h2>리뷰</h2>
                {product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                        <div key={review.reviewNum} className={styles.review}>
                            <h3>{review.reviewTitle}</h3>
                            <p>{review.reviewContent}</p>
                        </div>
                    ))
                ) : (
                    <p>아직 작성된 리뷰가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
