import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "../basic/Loading";
import Home from "../home/Home";
import Login from "../login/Login";
import SignUp from "../login/SignUp";
import ProdList from "../product/ProdList";
import ProductDetail from "../product/products/productItem/ProductDetail";

const AppRouter = () => {
  return (
    <div style={style}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/products" element={<ProdList />} />
          <Route path="/product/:productNum" element={<ProductDetail />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

export default AppRouter;
