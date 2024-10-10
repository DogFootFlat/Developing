import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './css/ProductDetail.module.css';
import ApiService from '../../../../ApiService';

const ProductDetail = () => {
    const { productNum } = useParams(); // URL 파라미터에서 productNum 가져오기
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await ApiService.fetchProductByNum(productNum);
                setProduct(response);
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

    return (
        <div className={styles.productDetail}>
            <h1 className={styles.productName}>{product.productName}</h1>
            <div className={styles.productImageGallery}>
                {product.productImg.map((img, index) => (
                    <img key={index} src={img} alt={product.productName} className={styles.productImage} />
                ))}
            </div>
            <div className={styles.productInfo}>
                <p className={styles.price}>
                    가격: <span className={styles.originalPrice}>{product.oprice} 원</span>
                    {product.rprice < product.oprice && (
                        <span className={styles.discountPrice}> 할인: {product.rprice} 원</span>
                    )}
                </p>
                <p className={styles.brand}>브랜드: {product.productBrand}</p>
                <p className={styles.category}>카테고리: {product.category.join(', ')}</p>
            </div>
            <div className={styles.productDetails}>
                <h2>상세 정보</h2>
                <ul>
                    {product.productDetails.map((detail, index) => (
                        <li key={index}>
                            <strong>색상:</strong> {detail.productSize}, 재고: {detail.productInven}개
                        </li>
                    ))}
                </ul>
            </div>
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
