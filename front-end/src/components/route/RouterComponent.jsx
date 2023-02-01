import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import BookList from "../book/BookList";
import AddBook from "../book/AddBook";
import EditBook from "../book/EditBook";
import UserHome from "../home/UserHome";
import UserList from "../user/UserList";
import AddUser from "../user/AddUser";
import EditUser from "../user/EditUser";

const AppRouter = () => {
  return (
    <div style={style}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/user-home" element={<UserHome />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book" element={<EditBook />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user" element={<EditUser />} />
      </Routes>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

export default AppRouter;
