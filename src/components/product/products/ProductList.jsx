import React, { useMemo } from 'react';
import Loading from '../../basic/Loading';
import Card from '../UI/Card';
import classes from './css/AvailableProducts.module.css';
import ProductItem from './productItem/ProductItem';

export default function ProductList({ isLoading, error, products }) {
  if (isLoading) {
    return (
      <Card className={classes.products}>
        <Loading />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={classes.products}>
        <div>
          <p>{error}</p>
        </div>
      </Card>
    );
  }

  if (products.length === 0) {
    return (
      <Card className={classes.products}>
        <h2>현재 상품 목록이 비어있습니다.</h2>
      </Card>
    );
  }

  const memoizedProductsList = useMemo(() => {
    return products.map((product) => (
      <ProductItem
        id={product.productCode}
        num={product.productNum}
        key={product.productCode}
        name={product.productName}
        genre={product.genreCode}
        img={product.productImg[0]}
        oprice={product.oprice}
        rprice={product.rprice}
      />
    ));
  }, [products]);

  return <ul className={classes['product-list']}>{memoizedProductsList}</ul>
}