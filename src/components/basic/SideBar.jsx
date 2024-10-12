import React, { useState } from 'react';
import classes from './css/SideBar.module.css';

const Sidebar = ({ isVisible, content, onClose }) => {
  const [key, setKey] = useState(0);

  const handleOnClose = () => {
    setKey(prevKey => prevKey + 1); // 키를 변경하여 컴포넌트를 다시 마운트
    onClose(); // 부모 컴포넌트의 onClose 함수 호출하여 사이드바 닫기
  };

  return (
    <div className={`${classes.sidebar} ${isVisible ? `${classes.visible}` : ''}`}>
      <div className={classes['sidebar-button']}>
        <button onClick={handleOnClose}>X</button>
      </div>
      <div key={key}>{content}</div> {/* 키가 변경될 때마다 콘텐츠가 다시 마운트됨 */}
    </div>
  );
};

export default Sidebar;
