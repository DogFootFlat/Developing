import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "../user/UserList";
import AddUser from "../user/AddUser";
import EditUser from "../user/EditUser";
import BookList from "../book/BookList";
import EditBook from "../book/EditBook";

const AppRouter = () => {
  return (
    <div style={style}>
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user" element={<EditUser />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/edit-book" element={<EditBook />} />
      </Routes>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

export default AppRouter;
