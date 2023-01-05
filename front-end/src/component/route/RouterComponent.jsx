import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "../user/UserList";
import EditUser from "../user/EditUser";
import BookList from "../book/BookList";
import EditBook from "../book/EditBook";
import ListExample from "../user/ListExample";
import AddExample from "../user/AddExample";
import EditExample from "../user/EditExample";

const AppRouter = () => {
  return (
    <div style={style}>
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/add-user" element={<AddExample />} />
        <Route path="/edit-user" element={<EditUser />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/add-book" element={<AddExample />} />
        <Route path="/edit-book" element={<EditBook />} />
        <Route path="/examples" element={<ListExample />} />
        <Route path="/add-example" element={<AddExample />} />
        <Route path="/edit-example" element={<EditExample />} />
      </Routes>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

export default AppRouter;
