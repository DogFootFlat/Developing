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
	const [query, setQuery] = useState({
		genre_major: '',
		genre_minor: '',
		genre: '',
		brand: '',
		category: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchProductsHandler = useCallback(async (queryObj) => {
		setIsLoading(true);
		setError(null);
		try {
			let response;
			if (Object.values(query).some((x) => x !== '')) {
				setQuery(queryObj);
				const queryArray = [];
				for (const [key, value] of Object.entries(queryObj)) {
					switch (key) {
						case 'genre':
							queryArray.push(`genre=${value}`);
							break;
						case 'brand':
							queryArray.push(`brand=${value}`);
							break;
						case 'category':
							queryArray.push(`category=${value}`);
							break;
					}
				}
				const queryString = queryArray.join('&');
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
			<ProductForm queryObj={query} fetchProducts={fetchProductsHandler} renderItems={renderItems} />
			<ul className={classes['product-list']}>{productsList}</ul> {/* 3xN 그리드 */}
		</Card>
	);
};

const renderItems = [
	{
		id: 'genre',
		items: [
			{
				id: 'genre_major',
				name: '장르 대분류 선택',
				list: [
					{ value: '001', label: '상의' },
					{ value: '002', label: '아우터' },
					{ value: '003', label: '바지' },
					{ value: '004', label: '원피스' },
					{ value: '005', label: '스커트' },
					{ value: '006', label: '스니커즈' },
					{ value: '007', label: '신발' },
					{ value: '008', label: '모자' },
					{ value: '009', label: '양말 및 레그워머' },
				],
			},
			{
				id: 'genre_minor',
				name: '장르 소분류 선택',
				list_obj: {
					'001': [
						{ value: '106', label: '니트 및 스웨터' },
						{ value: '104', label: '후드티' },
						{ value: '105', label: '맨투맨 및 스웨트셔츠' },
						{ value: '110', label: '긴팔티' },
						{ value: '102', label: '셔츠 및 블라우스' },
						{ value: '103', label: '카라티 및 피케 티셔츠' },
						{ value: '101', label: '반팔티' },
						{ value: '111', label: '민소매 티셔츠 및 나시' },
						{ value: '113', label: '스포츠 상의' },
						{ value: '108', label: '기타 상의' },
					],
					'002': [
						{ value: '122', label: '후드 집업' },
						{ value: '101', label: '블루종, MA-1 및 항공점퍼' },
						{ value: '102', label: '가죽 자켓' },
						{ value: '125', label: '무스탕 및 퍼 자켓' },
						{ value: '117', label: '트러커 및 데님 자켓' },
						{ value: '103', label: '블레이저 및 슈트 자켓' },
						{ value: '120', label: '가디건' },
						{ value: '119', label: '아노락' },
						{ value: '123', label: '후리스' },
						{ value: '118', label: '축구 져지 및 트레이닝 자켓' },
						{ value: '104', label: '바시티 및 스타디움 자켓' },
						{ value: '108', label: '트렌치 및 울 코트' },
						{ value: '107', label: '싱글 코드' },
						{ value: '124', label: '더블 코트' },
						{ value: '109', label: '더플 및 후드 코트' },
						{ value: '113', label: '롱패딩 및 다운 점퍼' },
						{ value: '112', label: '숏 및 크롭 패딩' },
						{ value: '116', label: '패딩 조끼' },
						{ value: '121', label: '조끼' },
						{ value: '114', label: '헌팅 자켓 및 사파리 자켓' },
						{ value: '106', label: '바람막이 및 코치 자켓' },
						{ value: '115', label: '기타 아우터' },
					],
					'003': [
						{ value: '102', label: '청바지 및 데님 팬츠' },
						{ value: '107', label: '치노 팬츠, 면 바지 및 코튼 팬츠' },
						{ value: '108', label: '슬렉스 및 슈트 팬츠' },
						{ value: '104', label: '트레이닝 및 조거 팬츠' },
						{ value: '109', label: '반바지 및 숏 팬츠' },
						{ value: '105', label: '레깅스' },
						{ value: '110', label: '점프 슈트, 멜방 바지 및 오버롤' },
						{ value: '111', label: '스포츠 하의' },
						{ value: '106', label: '기타 바지' },
					],
					'004': [
						{ value: '106', label: '미니 원피스' },
						{ value: '107', label: '미디 원피스' },
						{ value: '108', label: '맥시 원피스' },
					],
					'005': [
						{ value: '101', label: '미니 스커트' },
						{ value: '102', label: '미디 스커트' },
						{ value: '103', label: '롱 스커트' },
					],
					'006': [
						{ value: '102', label: '단화 및 캔버스화' },
						{ value: '103', label: '패션 스니커즈화' },
						{ value: '101', label: '스포츠 스니커즈화' },
						{ value: '104', label: '기타 스니커즈화' },
					],
					'007': [
						{ value: '114', label: '구두' },
						{ value: '115', label: '로퍼' },
						{ value: '112', label: '힐 및 펌프스' },
						{ value: '117', label: '플랫 슈즈' },
						{ value: '119', label: '블로퍼' },
						{ value: '104', label: '샌들' },
						{ value: '118', label: '슬리퍼' },
						{ value: '106', label: '기타 신발' },
						{ value: '116', label: '모카신 및 보트 슈즈' },
						{ value: '111', label: '부츠' },
					],
					'008': [
						{ value: '101', label: '캡 및 야구 모자' },
						{ value: '102', label: '베레모 및 헌팅캡' },
						{ value: '103', label: '페도라' },
						{ value: '104', label: '버킷 햇 및 사파리 햇' },
						{ value: '105', label: '비니' },
						{ value: '107', label: '트루퍼' },
						{ value: '106', label: '기타 모자' },
					],
					'009': [
						{ value: '101', label: '양말' },
						{ value: '102', label: '스타킹' },
					],
				},
			},
		],
	},
	{
		id: 'brand',
		items: [
			{
				id: 'brand',
				name: '브랜드 선택',
				list: [
					{ value: 'TWEE', label: 'TWEE' },
					{ value: 'GENERALIDEA', label: 'GENERALIDEA' },
					{ value: 'BLOND9', label: 'BLOND9' },
					{ value: 'AFTERPRAY', label: 'AFTERPRAY' },
					{ value: 'DRAWFIT WOMEN', label: 'DRAWFIT WOMEN' },
					{ value: 'BER DE NOIR', label: 'BER DE NOIR' },
					{ value: 'MONGDOL', label: 'MONGDOL' },
					{ value: 'MARITHÉ', label: 'MARITHÉ' },
					{ value: 'INTEMPOMOOD', label: 'INTEMPOMOOD' },
				],
			},
		],
	},
	{
		id: 'category',
		items: [
			{
				id: 'category',
				name: '카테고리 선택',
				list: [
					{ value: 'TWEE', label: 'TWEE' },
					{ value: 'GENERALIDEA', label: 'GENERALIDEA' },
					{ value: 'BLOND9', label: 'BLOND9' },
					{ value: 'AFTERPRAY', label: 'AFTERPRAY' },
					{ value: 'DRAWFIT WOMEN', label: 'DRAWFIT WOMEN' },
					{ value: 'BER DE NOIR', label: 'BER DE NOIR' },
					{ value: 'MONGDOL', label: 'MONGDOL' },
					{ value: 'MARITHÉ', label: 'MARITHÉ' },
					{ value: 'INTEMPOMOOD', label: 'INTEMPOMOOD' },
				],
			},
		],
	},
];

export default AvailableProducts;
