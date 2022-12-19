import axios from "axios";

const BOOK_API_BASE_URL = "http://localhost:8080/api/books";
const USER_API_BASE_URL = "http://localhost:8080/api/users";

class ApiService {
  fetchBooks() {
    return axios.get(BOOK_API_BASE_URL);
  }

  fetchBookByID(bookID) {
    return axios.get(BOOK_API_BASE_URL + "/" + bookID);
  }

  deleteBook(bookID) {
    return axios.delete(BOOK_API_BASE_URL + "/" + bookID);
  }

  addBook(book) {
    return axios.post(BOOK_API_BASE_URL, book);
  }

  editBook(book) {
    return axios.put(BOOK_API_BASE_URL + "/" + book.id, book);
  }

  fetchUsers() {
    return axios.get(USER_API_BASE_URL);
  }

  fetchUserByID(userID) {
    return axios.get(USER_API_BASE_URL + "/" + userID);
  }

  deleteUser(userID) {
    return axios.delete(USER_API_BASE_URL + "/" + userID);
  }

  addUser(user) {
    return axios.post(USER_API_BASE_URL, user);
  }

  editUser(user) {
    return axios.put(USER_API_BASE_URL + "/" + user.id, user);
  }
}

export default new ApiService();
