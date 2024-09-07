import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ApiService from '../../../ApiService';
import AuthContext from '../../../store/auth-context';
import Loading from '../../basic/Loading';
import Card from '../UI/Card';
import classes from './css/AvailableProducts.module.css';
import ProductItem from './productItem/ProductItem';

const AvailableProducts = () => {
  const ctx = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchMethod, setSearchMethod] = useState('');

  const fetchProductsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let response = {};
      response = await ApiService.fetchProducts();
      if (response.status < 200 || response.status > 299) {
        throw new Error('Something went wrong!');
      }
      const data = await response.data?.content;
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const onSelectChange = (event) => {
    setSearchMethod(event.target.value);

    if (event.target.value && event.target.value !== '') {
      fetchProductsHandlerByGenreCode(event.target.value);
    }
  };

  const fetchProductsHandlerByGenreCode = useCallback(async (genreCode) => {
    setIsLoading(true);
    setError(null);
    try {
      let response = {};
      if (genreCode && genreCode !== '' && genreCode !== 'all') {
        response = await ApiService.fetchProductsByGenreCode(genreCode);
      } else {
        response = await ApiService.fetchProducts();
      }
      if (response.status < 200 || response.status > 299) {
        throw new Error('Something went wrong!');
      }
      const data = await response.data?.content;
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProductsHandler();
    ctx.setCurrentPage('prod-list');
  }, [fetchProductsHandler]);

  if (products.length <= 0) {
    return (
      <Card className={classes.products}>
        <h2>현재 상품 목록이 비어있습니다.</h2>
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
  if (isLoading) {
    return (
      <Card className={classes.products}>
        <Loading />;
      </Card>
    );
  }

  const productsList = products.map((product) => (
    <ProductItem
      id={product.productCode}
      key={product.productCode}
      name={product.productName}
      genre={product.genreCode}
      img={product.productImg[0]}
      price={product.oprice}
    />
  ));

  return (
    <Card className={classes.products}>
      {/* 장르 */}
      <FormControl variant="filled" fullWidth>
        <InputLabel htmlFor="uncontrolled-native">장르 선택</InputLabel>
        <Select displayEmpty value={searchMethod} onChange={onSelectChange} sx={{ textAlign: 'right' }}>
          <MenuItem value="">전체</MenuItem>
          <MenuItem value="0010106">니트 및 스웨터</MenuItem>
          <MenuItem value="0010104">후드티</MenuItem>
          <MenuItem value="0010105">맨투맨 및 스웨트셔츠</MenuItem>
        </Select>
      </FormControl>
      {/* 카테고리 */}
      {/* <FormControl variant="filled" fullWidth>
        <InputLabel htmlFor="uncontrolled-native">카테고리 선택</InputLabel>
        <Select displayEmpty value={searchMethod} onChange={onSelectChange} sx={{ textAlign: 'right' }}>
          <MenuItem value="">전체</MenuItem>
          <MenuItem value="0010106">니트 및 스웨터</MenuItem>
          <MenuItem value="0010104">후드티</MenuItem>
          <MenuItem value="0010105">맨투맨 및 스웨트셔츠</MenuItem>
        </Select>
      </FormControl> */}
      {/* 브랜드 */}
      {/* <FormControl variant="filled" fullWidth>
        <InputLabel htmlFor="uncontrolled-native">브랜드 선택</InputLabel>
        <Select displayEmpty value={searchMethod} onChange={onSelectChange} sx={{ textAlign: 'right' }}>
          <MenuItem value="">전체</MenuItem>
          <MenuItem value="0010106">니트 및 스웨터</MenuItem>
          <MenuItem value="0010104">후드티</MenuItem>
          <MenuItem value="0010105">맨투맨 및 스웨트셔츠</MenuItem>
        </Select>
      </FormControl> */}
      <ul>{productsList}</ul>
    </Card>
  );
};

export default AvailableProducts;
