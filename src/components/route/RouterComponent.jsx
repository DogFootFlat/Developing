import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loading from '../basic/Loading';
import Home from '../home/Home';
import Login from '../login/Login';
import SignUp from '../login/SignUp';
import MyPage from '../mypage/MyPage';
import ProdList from '../product/ProdList';
import ProductDetail from '../product/products/productItem/ProductDetail';
import ProductPurchase from '../product/products/productPurchase/ProductPurchase';
import CartProvider from '../../store/CartProvider';

const AppRouter = () => {
  return (
    <div style={style}>
      <CartProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/products" element={<ProdList />} />
            <Route path="/product/:productNum" element={<ProductDetail />} />
            <Route path="/purchase/:productNum" element={<ProductPurchase />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </div>
  );
};

const style = {
  marginTop: '20px',
};

export default AppRouter;
