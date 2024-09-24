import React, { useState } from 'react';
import ProductFilter from './ProductFilter';

const ProductForm = ({ fetchProducts }) => {

	const onChangeHandler = (id, value) => {
		const queryArray = [];
		switch (id) {
			case "genre":
				queryArray.push(`genre=${value}`)
			case "brand":
				queryArray.push(`brand=${value}`)
		}
		fetchProducts(queryArray.join('&')); // 쿼리 문자열을 보내기
	};

	return (
		<>
			<ProductFilter
				id="genre"
				name="장르 대분류 선택"
				onChange={onChangeHandler}
				list={[
					{ value: '001', label: '상의' },
					{ value: '002', label: '아우터' },
					{ value: '003', label: '바지' },
					{ value: '004', label: '원피스' },
					{ value: '005', label: '스커트' },
					{ value: '006', label: '스니커즈' },
					{ value: '007', label: '신발' },
					{ value: '008', label: '모자' },
					{ value: '009', label: '양말 및 레그워머' },
				]}
			/>
			<ProductFilter
				id="brand"
				name="브랜드 선택"
				onChange={onChangeHandler}
				list={[
					{ value: 'TWEE', label: 'TWEE' },
					{ value: 'GENERALIDEA', label: 'GENERALIDEA' },
					{ value: 'BLOND9', label: 'BLOND9' },
					{ value: 'AFTERPRAY', label: 'AFTERPRAY' },
					{ value: 'DRAWFIT WOMEN', label: 'DRAWFIT WOMEN' },
					{ value: 'BER DE NOIR', label: 'BER DE NOIR' },
					{ value: 'MONGDOL', label: 'MONGDOL' },
					{ value: 'MARITHÉ', label: 'MARITHÉ' },
					{ value: 'INTEMPOMOOD', label: 'INTEMPOMOOD' },
				]}
			/>
		</>
	);
};

export default ProductForm;
