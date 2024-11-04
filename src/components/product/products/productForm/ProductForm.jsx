import React, { useState } from 'react';
import ProductFilter from './ProductFilter';
import ProductFilters from './ProductFilters';

const ProductForm = ({ queryObj, fetchProducts, renderItems }) => {
  const [query, setQuery] = useState(queryObj);

  const onChangeHandler = (filter_id, value) => {
    switch (filter_id) {
      case 'genre_major':
        query.genre_major = value;
        break;
      case 'genre_minor':
        query.genre_minor = value;
        break;
      case 'genre':
        query.genre = value;
        break;
      case 'brand':
        query.brand = value;
        break;
      case 'category':
        query.category = value;
        break;
    }
    setQuery(query);
    fetchProducts(query); // 쿼리 문자열을 보내기
  };

  return (
    <>
      {renderItems.map((renderItem) =>
        renderItem.items?.length <= 1 ? (
          <ProductFilter id={renderItem.id} key={renderItem.id} queryObj={query} items={renderItem.items} onChange={onChangeHandler} />
        ) : (
          <ProductFilters id={renderItem.id} key={renderItem.id} queryObj={query} items={renderItem.items} onChange={onChangeHandler} />
        )
      )}
    </>
  );
};

export default ProductForm;
