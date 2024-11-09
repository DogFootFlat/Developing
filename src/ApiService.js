import axios from 'axios';
import { PRODUCTS } from './PRODUCTS';
import { PRODUCT } from './PRODUCT';
import { PRODUCT_BRAND } from './PRODUCT_BRAND';

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
    // return axios.get(`${API_BASE_URL}/product`, { withCredentials: true });
    // TODO: 테스트코드
    return PRODUCTS;
  }

  fetchProductsByQueryString(queryString) {
    // return axios.get(`${API_BASE_URL}/product?${queryString}`, { withCredentials: true });
    // TODO: 테스트코드
    console.log(queryString);
    return PRODUCTS;
  }

  searchProductsByQueryString(queryString) {
    // return axios.get(`${API_BASE_URL}/search?${queryString}`, { withCredentials: true });
    // TODO: 테스트코드
    console.log(queryString);
    return PRODUCTS;
  }

  fetchProductByNum(productNum) {
    // return axios.get(`${API_BASE_URL}/product_detail/${productNum}`, { withCredentials: true });
    // TODO: 테스트코드
    return {
      data: {
        productCode: '5006538447',
        productName: '네티 랩 썸머니트',
        productImg: ['https://image.msscdn.net/images/goods_img/20240509/4118941/4118941_17152412559989_125.jpg'],
        productInfo: null,
        category: ['nnn'],
        genreCode: '0010106',
        payment: 3,
        favorite: 0,
        review: 0,
        productRdate: '2024-06-01T02:08:00',
        isDeleted: 0,
        judge: 'NULL',
        productBrand: 'TWEE',
        productGender: 1,
        productRegistrant: 'NULL',
        productNum: 6,
        productDetails: [],
        reviews: [],
        oprice: 29900,
        rprice: 0,
      },
    };
  }

  // 장바구니 목록 조회
  fetchCartList() {
    return axios.get(`${API_BASE_URL}/cart/list`, { withCredentials: true });
  }

  // 장바구니에 상품 추가
  addToCart(productNum, productQuantity) {
    return axios.post(`${API_BASE_URL}/cart/add/${productNum}/${productQuantity}`, {}, { withCredentials: true });
  }

  // 장바구니에 상품 상세 추가
  addToCartDetail(productDetailCode, productQuantity) {
    return axios.post(`${API_BASE_URL}/cart/add/detail/${productDetailCode}/${productQuantity}`, {}, { withCredentials: true });
  }

  // 장바구니에서 상품 삭제
  removeFromCart(cartNum) {
    return axios.delete(`${API_BASE_URL}/cart/delete/${cartNum}`, { withCredentials: true });
  }

  // 장바구니 상품 수량 감소
  decreaseCartItem(cartNum) {
    return axios.post(`${API_BASE_URL}/cart/minus/${cartNum}`, {}, { withCredentials: true });
  }

  // 장바구니 상품 수량 증가
  increaseCartItem(cartNum) {
    return axios.post(`${API_BASE_URL}/cart/plus/${cartNum}`, {}, { withCredentials: true });
  }

  // 장바구니 동기화
  syncCart(cartItems) {
    return axios.post(`${API_BASE_URL}/cart/sync`, cartItems, { withCredentials: true });
  }
}

export default new ApiService();
