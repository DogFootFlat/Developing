import React, { useState, useEffect, useContext, useCallback } from 'react';
import MealItem from './mealItem/MealItem';
import Card from '../UI/Card';
import classes from './css/AvailableMeals.module.css';
import AuthContext from '../../../store/auth-context';
import ApiService from '../../../ApiService';
import { FormControl, MenuItem, Select } from '@material-ui/core';

const AvailableMeals = () => {
	const ctx = useContext(AuthContext);

	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchMethod, setSearchMethod] = useState('옷 분류');

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

	const fetchProductsHandlerByGenreCode = useCallback(async (genreCode) => {
		setIsLoading(true);
		setError(null);
		try {
			let response = {};
			if (!genreCode && genreCode !== '') {
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

	const onSelectChange = (event) => {
		setSearchMethod(event.target.value);

		if (!event.target.value && event.target.value !== '') {
			fetchProductsHandlerByGenreCode(event.target.value);
		}
	};

	useEffect(() => {
		fetchProductsHandler();
		ctx.setCurrentPage('prod-list');
	}, [fetchProductsHandler]);

	if (products.length <= 0) {
		return (
			<Card className={classes.meals}>
				<h2>현재 상품 목록이 비어있습니다.</h2>
			</Card>
		);
	}

	if (error) {
		return (
			<Card className={classes.meals}>
				<div>
					<p>{error}</p>
				</div>
			</Card>
		);
	}
	if (isLoading) {
		return (
			<Card className={classes.meals}>
				<Loading />;
			</Card>
		);
	}

	const productsList = products.map((product) => (
		<MealItem
			id={product.productCode}
			key={product.productCode}
			name={product.productName}
			genre={product.genreCode}
			img={product.productImg[0]}
			price={product.oprice}
		/>
	));

	return (
		<Card className={classes.meals}>
			<FormControl fullWidth>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="Genre"
					value={searchMethod}
					onChange={onSelectChange}
					sx={{
						textAlign: 'right',
					}}
				>
					<MenuItem value="0010106">니트 및 스웨터</MenuItem>
					<MenuItem value="0010104">후드티</MenuItem>
					<MenuItem value="0010105">맨투맨 및 스웨트셔츠</MenuItem>
				</Select>
			</FormControl>
			<ul>{productsList}</ul>
		</Card>
	);
};

export default AvailableMeals;
