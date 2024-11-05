import { Pagination } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ApiService from '../../../ApiService';
import AuthContext from '../../../store/auth-context';
import Card from '../UI/Card';
import * as CONSTANT from './const';
import classes from './css/AvailableProducts.module.css';
import ProductForm from './productForm/ProductForm';
import ProductSearch from './productForm/ProductSearch';
import ProductList from './ProductList';

const AvailableProducts = () => {
  const ctx = useContext(AuthContext);

  const [query, setQuery] = useState({
    genre_major: '',
    genre_minor: '',
    genre: '',
    brand: '',
    category: '',
    sort: 'payment_n,desc',
    page: 1,
  });

  const [search, setSearch] = useState({
    genre: '',
    keyword: '',
  });

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProductsHandler = useCallback(async (queryObj) => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (Object.values(queryObj).some((x) => x !== '')) {
        const queryArray = Object.entries(queryObj)
          .filter(([key, value]) => !['genre_major', 'genre_minor'].includes(key) && value !== '')
          .map(([key, value]) => `${key}=${encodeURIComponent(key === 'page' ? value - 1 : value)}`);
        const queryString = queryArray.join('&');
        response = await ApiService.fetchProductsByQueryString(queryString);
      } else {
        response = await ApiService.fetchProducts();
      }
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Something went wrong!');
      }
      const data = response.data;
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchProductsHandler = useCallback(async (queryObj) => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (Object.values(queryObj).some((x) => x !== '')) {
        const queryArray = Object.entries(queryObj)
          .filter(([key, value]) => value !== '')
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);
        const queryString = queryArray.join('&');
        response = await ApiService.searchProductsByQueryString(queryString);
      } else {
        response = await ApiService.fetchProducts();
      }
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Something went wrong!');
      }
      const data = response.data;
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsHandler(query);
  }, [fetchProductsHandler, query]);

  useEffect(() => {
    searchProductsHandler(search);
  }, [searchProductsHandler, search]);

  useEffect(() => {
    ctx.setCurrentPage('products');
  }, [ctx]);

  const handlePageChange = useCallback((event, value) => {
    setQuery((prevQuery) => ({ ...prevQuery, page: value }));
  }, []);

  const handleFilterChange = useCallback((filterId, value) => {
    setQuery((prevQuery) => ({ ...prevQuery, [filterId]: value }));
    filterId === 'genre' && setSearch((prevSearch) => ({ ...prevSearch, genre: value }));
  }, []);

  const handleSearch = useCallback((searchTerm) => {
    setSearch((prevSearch) => ({ ...prevSearch, keyword: searchTerm }));
  }, []);

  return (
    <Card className={classes.products}>
      <ProductSearch onSearch={handleSearch} />
      <ProductForm queryObj={query} fetchProducts={handleFilterChange} renderItems={CONSTANT.renderItems} />
      <Pagination
        count={totalPages}
        page={query.page}
        onChange={handlePageChange}
        color="primary"
        className={classes.pagination}
        siblingCount={1}
        boundaryCount={1}
        showFirstButton
        showLastButton
      />
      <ProductList isLoading={isLoading} error={error} products={products} />
    </Card>
  );
};

export default React.memo(AvailableProducts);
