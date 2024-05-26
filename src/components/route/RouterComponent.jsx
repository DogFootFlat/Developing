import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../home/Home";
import UserHome from "../home/UserHome";
import Loading from "../basic/Loading";
import Login from "../login/Login";
import SNSLogin from "../login/SNSLogin";
import SignUp from "../login/SignUp"
import ProdList from "../product/ProdList";

const BookList = React.lazy(() => import("../book/BookList"))
const AddBook = React.lazy(() => import("../book/AddBook"))
const EditBook = React.lazy(() => import("../book/EditBook"))
const LoanCount = React.lazy(() => import("../book/LoanCount"))
const UserList = React.lazy(() => import("../user/UserList"))
const AddUser = React.lazy(() => import("../user/AddUser"))
const EditUser = React.lazy(() => import("../user/EditUser"))

const AppRouter = () => {
  return (
    <div style={style}>
      <Suspense fallback={ <Loading /> }>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user-home" element={<UserHome />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-book" element={<EditBook />} />
          <Route path="/loan-count" element={<LoanCount />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<div>API 연결 필요</div>} /> // TODO: EJH API 연결 필요
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/prod-list" element={<ProdList />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

export default AppRouter;
