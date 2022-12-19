import React from "react";
import { Routes, Route } from "react-router-dom";
import BookList from "../user/BookList";
import UserList from "../user/UserList";
import ListExample from "../user/ListExample";
import AddExample from "../user/AddExample";
import EditExample from "../user/EditExample";

const AppRouter = () => {
  return (
    <div style={style}>
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/add-user" element={<AddExample />} />
        <Route path="/edit-user" element={<EditExample />} />
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
