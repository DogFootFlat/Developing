import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import Home from "../home/Home";
const UserHome = React.lazy(() => import("../home/UserHome"))
const BookList = React.lazy(() => import("../book/BookList"))
const AddBook = React.lazy(() => import("../book/AddBook"))
const EditBook = React.lazy(() => import("../book/EditBook"))
const UserList = React.lazy(() => import("../user/UserList"))
const AddUser = React.lazy(() => import("../user/AddUser"))
const EditUser = React.lazy(() => import("../user/EditUser"))

const AppRouter = () => {
  return (
    <div style={style}>
      <Suspense fallback={ <CircularProgress /> }>
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
      </Suspense>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

export default AppRouter;
