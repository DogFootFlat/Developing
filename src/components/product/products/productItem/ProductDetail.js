import React, { useState, useEffect } from 'react';
import styles from './ProductDetail.module.css'; // CSS 모듈 가져오기

const ProductDetail = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 데이터 가져오기 (가상의 API 호출)
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`/api/products/${productId}`); // 실제 API 경로에 맞게 수정
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>상품을 찾을 수 없습니다.</div>;
    }

    return (
        <div className={styles.productDetail}>
            <h1>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.description}</p>
            <p className={styles.price}>
                가격: <span>{product.price} 원</span>
            </p>
            {product.discount && (
                <p className={styles.discount}>
                    할인 가격: <span>{product.discountPrice} 원</span>
                </p>
            )}
        </div>
    );
};

export default ProductDetail;
