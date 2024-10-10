import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "../basic/Loading";
import Home from "../home/Home";
import Login from "../login/Login";
import SignUp from "../login/SignUp";
import ProdList from "../product/ProdList";
import ProductDetail from "../product/products/productItem/ProductDetail";

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
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/prod-list" element={<ProdList />} />
          <Route path="/prod-detail" element={<ProductDetail />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

export default AppRouter;
