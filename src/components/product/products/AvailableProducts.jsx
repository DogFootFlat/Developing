import React, { useCallback, useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Pagination } from '@mui/material';
import ApiService from '../../../ApiService';
import Card from '../UI/Card';
import classes from './css/AvailableProducts.module.css';
import ProductItem from './productItem/ProductItem';

const AvailableProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    genre: [],
    brand: [],
    category: [],
    sort: 'payment_n,desc',
    page: 1,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchProductsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (searchKeyword) {
        response = await ApiService.searchProducts(searchKeyword, filters.genre[0]);
      } else {
        response = await ApiService.fetchProducts(filters);
      }
      if (response.status < 200 || response.status >= 300) {
        throw new Error('상품을 불러오는 데 실패했습니다.');
      }
      const data = response.data;
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || '상품을 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [filters, searchKeyword]);

  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: Array.isArray(prev[name]) ? [value] : value,
      page: 1
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setFilters(prev => ({ ...prev, page: 1 }));
    fetchProductsHandler();
  };

  const handlePageChange = (event, value) => {
    setFilters(prev => ({ ...prev, page: value }));
  };

  const productsList = products.map((product) => (
    <ProductItem
      key={product.productCode}
      id={product.productCode}
      num={product.productNum}
      name={product.productName}
      genre={product.genreCode}
      img={product.productImg[0]}
      oprice={product.oprice}
      rprice={product.rprice}
    />
  ));

  return (
    <Card className={classes.products}>
      <form onSubmit={handleSearch} className={classes.searchForm}>
        <TextField
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="검색어를 입력하세요"
          variant="outlined"
          size="small"
        />
        <Button type="submit" variant="contained" color="primary">검색</Button>
      </form>

      <div className={classes.filters}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>옷 분류</InputLabel>
          <Select
            name="genre"
            value={filters.genre[0] || ''}
            onChange={handleFilterChange}
            label="옷 분류"
          >
            <MenuItem value="">전체</MenuItem>
            <MenuItem value="001">상의</MenuItem>
            <MenuItem value="002">아우터</MenuItem>
            <MenuItem value="003">바지</MenuItem>
            {/* 추가 옷 분류 */}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>브랜드</InputLabel>
          <Select
            name="brand"
            value={filters.brand[0] || ''}
            onChange={handleFilterChange}
            label="브랜드"
          >
            <MenuItem value="">전체</MenuItem>
            <MenuItem value="TWEE">TWEE</MenuItem>
            <MenuItem value="GENERALIDEA">GENERALIDEA</MenuItem>
            <MenuItem value="BLOND9">BLOND9</MenuItem>
            {/* 추가 브랜드 */}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>카테고리</InputLabel>
          <Select
            name="category"
            value={filters.category[0] || ''}
            onChange={handleFilterChange}
            label="카테고리"
          >
            <MenuItem value="">전체</MenuItem>
            <MenuItem value="nnn">nnn</MenuItem>
            {/* 추가 카테고리 */}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>정렬</InputLabel>
          <Select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            label="정렬"
          >
            <MenuItem value="product_name,asc">상품명 오름차순</MenuItem>
            <MenuItem value="product_name,desc">상품명 내림차순</MenuItem>
            <MenuItem value="o_price,asc">가격 낮은순</MenuItem>
            <MenuItem value="o_price,desc">가격 높은순</MenuItem>
            <MenuItem value="payment_n,desc">판매량 높은순</MenuItem>
            <MenuItem value="favorite_n,desc">인기순</MenuItem>
            <MenuItem value="product_r_date,desc">최신순</MenuItem>
          </Select>
        </FormControl>
      </div>

      {isLoading && <p>로딩 중...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <>
          <ul className={classes.productList}>{productsList}</ul>
          <Pagination
            count={totalPages}
            page={filters.page}
            onChange={handlePageChange}
            color="primary"
            className={classes.pagination}
          />
        </>
      )}
    </Card>
  );
};

export default AvailableProducts;