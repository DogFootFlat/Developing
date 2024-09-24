import React, { useCallback, useContext, useEffect, useState } from 'react';
import ApiService from '../../../ApiService';
import AuthContext from '../../../store/auth-context';
import Loading from '../../basic/Loading';
import Card from '../UI/Card';
import classes from './css/AvailableProducts.module.css';
import ProductForm from './productForm/ProductForm';
import ProductItem from './productItem/ProductItem';

const AvailableProducts = () => {
	const ctx = useContext(AuthContext);

	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchProductsHandler = useCallback(async (queryString) => {
		setIsLoading(true);
		setError(null);
		try {
			let response;
			if (queryString?.trim() !== '') {
				response = await ApiService.fetchPrudctsByQueryString(queryString);
			} else {
				response = await ApiService.fetchProducts();
			}
			if (response.status < 200 || response.status >= 300) {
				throw new Error('Something went wrong!');
			}
			const data = response.data?.content || [];
			setProducts(data);
		} catch (err) {
			setError(err.message || 'Failed to fetch products');
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProductsHandler(); // 초기 로드 시 fetch
		ctx.setCurrentPage('prod-list');
	}, [fetchProductsHandler, ctx]);

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
			<ProductForm fetchProducts={fetchProductsHandler} />
			<ul>{productsList}</ul>
		</Card>
	);
};

export default AvailableProducts;
