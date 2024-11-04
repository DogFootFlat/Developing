import React, { useCallback } from 'react';
import ProductFilter from './ProductFilter';
import ProductFilters from './ProductFilters';

const ProductForm = React.memo(({ queryObj, fetchProducts, renderItems }) => {
  const onChangeHandler = useCallback((filter_id, value) => {
    fetchProducts(filter_id, value);
  }, [fetchProducts]);

  return (
    <>
      {renderItems.map((renderItem) =>
        renderItem.items?.length <= 1 ? (
          <ProductFilter 
            id={renderItem.id} 
            key={renderItem.id} 
            queryObj={queryObj} 
            items={renderItem.items} 
            onChange={onChangeHandler} 
          />
        ) : (
          <ProductFilters 
            id={renderItem.id} 
            key={renderItem.id} 
            queryObj={queryObj} 
            items={renderItem.items} 
            onChange={onChangeHandler} 
          />
        )
      )}
    </>
  );
});

export default ProductForm;