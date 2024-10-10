import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams 가져오기
import styles from './css/ProductDetail.module.css';
import ApiService from '../../../../ApiService';

const ProductDetail = () => {
    const { productNum } = useParams(); // URL 파라미터에서 productNum 가져오기
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await ApiService.fetchProductByNum(productNum)
                const data = await response.json();
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
