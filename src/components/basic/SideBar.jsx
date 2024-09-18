import React from 'react';
import classes from './css/SideBar.module.css';

const Sidebar = ({ isVisible, content, onClose }) => {
  return (
    <div className={`${classes.sidebar} ${isVisible ? `${classes.visible}` : ''}`}>
      <button className="close-button" onClick={onClose}>
        X
      </button>
      {content}
    </div>
  );
};

export default Sidebar;
