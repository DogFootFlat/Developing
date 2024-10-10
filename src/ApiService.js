import axios from 'axios';
import { PRODUCT } from './PRODUCT';
import { PRODUCT_GENRE } from './PRODUCT_GENRE';

const API_BASE_URL = 'https://back.otpishai.shop';

class ApiService {
	getSignInUrl(site) {
		return axios.get(`${API_BASE_URL}/signin/${site}`, { withCredentials: true });
	}

	signIn(url) {
		window.location.href = url;
	}

	fetchUsers() {
		return axios.get(`${API_BASE_URL}/register`, { withCredentials: true });
	}

	fetchProducts() {
		return axios.get(`${API_BASE_URL}/product`, { withCredentials: true });
		// TODO: 테스트코드
		return PRODUCT;
	}

	fetchPrudctsByQueryString(queryString) {
		return axios.get(`${API_BASE_URL}/product?${queryString}`, { withCredentials: true });
		// TODO: 테스트코드
		return PRODUCT;
	}

	fetchProductByNum(productNum) {
		return axios.get(`${API_BASE_URL}/product_detail?${productNum}`, { withCredentials: true });
		// TODO: 테스트코드
		return PRODUCT;
	}
}

export default new ApiService();
