import axios from 'axios';
import { PRODUCT } from './PRODUCT';
import { PRODUCT_GENRE } from './PRODUCT_GENRE';

const API_BASE_URL = 'https://otpishai.shop';

class ApiService {
	getSignInUrl(site) {
		return axios.get(`${API_BASE_URL}/signin/${site}`);
	}

	signIn(url) {
		window.location.href = url;
	}

	fetchUsers() {
		return axios.get(`${API_BASE_URL}/register`, { withCredentials: true });
	}

	fetchProducts() {
		return axios.get(`${API_BASE_URL}/product`);
		// TODO: 테스트코드
		return PRODUCT;
	}

	fetchPrudctsByQueryString(queryString) {
		return axios.get(`${API_BASE_URL}/product?${queryString}`);
		// TODO: 테스트코드
		return PRODUCT;
	}

	fetchBooks() {
		return axios.get(`${API_BASE_URL}/books`);
	}

	addUser(user) {
		return axios.post(`${API_BASE_URL}/register`, user, { withCredentials: true });
	}

	fetchBookByID(bookId) {
		return axios.get(`${API_BASE_URL}/books/${bookId}`);
	}

	editBook(book) {
		return axios.put(`${API_BASE_URL}/books/${book.key}`, book);
	}

	addBook(book) {
		return axios.post(`${API_BASE_URL}/books`, book);
	}

	fileUpLoad(book) {
		return axios.post(`${API_BASE_URL}/books`, book);
	}

	deleteBook(bookId) {
		return axios.delete(`${API_BASE_URL}/books/${bookId}`);
	}

	fetchUserByID(userId) {
		return axios.get(`${API_BASE_URL}/users/${userId}`);
	}

	editUser(user) {
		return axios.put(`${API_BASE_URL}/users/${user.key}`, user);
	}

	deleteUser(userId) {
		return axios.delete(`${API_BASE_URL}/users/${userId}`);
	}
}

export default new ApiService();
