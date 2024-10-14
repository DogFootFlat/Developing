import React, { useEffect, useState } from 'react';
import styles from './css/FavoriteProducts.module.css';

const FavoriteProducts = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Mock API call to fetch favorite products
    const fetchFavoriteProducts = async () => {
      // You can replace this with a real API call
      const mockFavoriteProducts = [
        {
          id: 'P123',
          productName: '오디너리 스트라이프 반팔 니트',
          price: 19900,
          imgSrc: 'https://via.placeholder.com/150',
        },
        {
          id: 'P456',
          productName: '오버핏 데님 자켓',
          price: 59000,
          imgSrc: 'https://via.placeholder.com/150',
        },
        {
          id: 'P789',
          productName: '빈티지 가죽 신발',
          price: 89000,
          imgSrc: 'https://via.placeholder.com/150',
        },
      ];
      setFavorites(mockFavoriteProducts);
    };

    fetchFavoriteProducts();
  }, []);

  return (
    <div className={styles.favoriteProducts}>
      <h2>관심 상품</h2>
      {favorites.length === 0 ? (
        <p>관심 상품이 없습니다.</p>
      ) : (
        <div className={styles.productGrid}>
          {favorites.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.imgSrc}
                alt={product.productName}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.productName}</h3>
                <p className={styles.productPrice}>
                  {product.price.toLocaleString()}원
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteProducts;
