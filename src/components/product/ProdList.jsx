import SmartToyIcon from '@mui/icons-material/SmartToy';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import CartProvider from '../../store/CartProvider';
import Sidebar from '../basic/SideBar';
import Header from '../layout/Header';
import Cart from './cart/Cart';
import Products from './products/Products';

function ProdList() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [sidebarIsVisible, setSidebarIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const toggleSidebar = () => {
    setSidebarIsVisible(prev => !prev);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Products />
      </main>

      {/* 아이콘 버튼 */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: 'fixed',
          right: '30px',
          bottom: '30px',
          width: '30px',
          height: '30px'
        }}
      >
        <SmartToyIcon color="primary" />
      </IconButton>

      {/* 사이드바 모달 */}
      <Sidebar 
        isVisible={sidebarIsVisible} 
        content={<p>여기에 특정 HTML 콘텐츠가 나타납니다!</p>} 
        onClose={toggleSidebar} // 닫기 핸들러
      />
    </CartProvider>
  );
}

export default ProdList;
