import SmartToyIcon from '@mui/icons-material/SmartToy';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import CartProvider from '../../store/CartProvider';
import Sidebar from '../basic/SideBar';
import Header from '../layout/Header';
import Cart from './cart/Cart';
import Products from './products/Products';
import classes from './css/ProdList.module.css';

function ProdList() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [sidebarIsVisible, setSidebarIsVisible] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  // 외부 HTML 파일을 가져오기 위한 useEffect
  useEffect(() => {
    if (sidebarIsVisible) {
      fetch('/chatbot.html')  // public 폴더 내 chatbot.html
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');

          // 1. <head>의 스타일 태그 및 링크 태그 추출
          const headElements = doc.head.querySelectorAll('style, link[rel="stylesheet"]');

          // 2. 추출한 스타일 요소들을 <head>에 추가
          headElements.forEach(element => {
            document.head.appendChild(element.cloneNode(true));
          });

          // 3. <body>의 콘텐츠만 추출
          const bodyContent = doc.body.innerHTML;
          setHtmlContent(bodyContent);

          // 4. <script> 태그 추출 및 실행
          const scriptElements = doc.body.querySelectorAll('script');
          scriptElements.forEach((script) => {
            const newScript = document.createElement('script');
            if (script.src) {
              newScript.src = script.src;  // 외부 스크립트일 경우 src 복사
            } else {
              newScript.textContent = script.textContent;  // 인라인 스크립트일 경우 내용 복사
            }
            document.body.appendChild(newScript);  // 스크립트 실행
          });
        })
        .catch(error => console.error('Failed to load chatbot.html:', error));
    }

    document.body.style.overflow = sidebarIsVisible ? 'hidden' : 'auto';

    // Cleanup 함수에서 사이드바가 닫힐 때 스크롤 복원
    return () => {
      document.body.style.overflow = 'auto';  // 사이드바가 닫힐 때 스크롤 복원
    };
  }, [sidebarIsVisible]);

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
        content={
          <div className={classes['sidebar-content']} 
          dangerouslySetInnerHTML={{ __html: htmlContent }}>
          </div>
        }
        onClose={toggleSidebar}
      />
    </CartProvider >
  );
}

export default ProdList;
