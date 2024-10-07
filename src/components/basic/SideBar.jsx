import React from 'react';
import classes from './css/SideBar.module.css';

const Sidebar = ({ isVisible, content, onClose }) => {
  return (
    <div className={`${classes.sidebar} ${isVisible ? `${classes.visible}` : ''}`}>
      <div className={classes['sidebar-button']}>
        <button onClick={onClose}>
        X
      </button>
      </div>
      {content}
    </div>
  );
};

export default Sidebar;
