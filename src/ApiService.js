import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class ApiService {
  signIn(site) {
    return axios.get(API_BASE_URL + `/oauth2/authorization/${site}`);
  }

  fetchProducts() {
    return axios.get(API_BASE_URL + '/product');
  }

  fetchBooks() {
    return axios.get(API_BASE_URL + '/books');
  }

  fetchBookByID(bookId) {
    return axios.get(API_BASE_URL + '/books/' + bookId);
  }

  editBook(book) {
    return axios.put(API_BASE_URL + '/books/' + book.key, book);
  }

  addBook(book) {
    return axios.post(API_BASE_URL + '/books', book);
  }

  fileUpLoad(book) {
    return axios.post(API_BASE_URL + '/books', book);
  }

  deleteBook(bookId) {
    return axios.delete(API_BASE_URL + '/books/' + bookId);
  }

  fetchUsers() {
    return axios.get(API_BASE_URL + '/users');
  }

  fetchUserByID(userId) {
    return axios.get(API_BASE_URL + '/users/' + userId);
  }

  editUser(user) {
    return axios.put(API_BASE_URL + '/users/' + user.key, user);
  }

  addUser(user) {
    return axios.post(API_BASE_URL + '/users', user);
  }

  deleteUser(userId) {
    return axios.delete(API_BASE_URL + '/users/' + userId);
  }
}

export default new ApiService();
