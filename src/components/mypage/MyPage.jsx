import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import FavoriteProducts from './FavoriteProducts.jsx';
import OrderHistory from './OrderHistory';
import Profile from './Profile';
import Reviews from './Reviews';
import styles from './css/MyPage.module.css';

const MyPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={styles.myPage}>
      <h1 className={styles.pageTitle}>마이 페이지</h1>
      <Box className={styles.tabsContainer}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="프로필" />
          <Tab label="주문 내역" />
          <Tab label="관심 상품" />
          <Tab label="리뷰" />
        </Tabs>
      </Box>

      <div className={styles.tabContent}>
        {selectedTab === 0 && <Profile />}
        {selectedTab === 1 && <OrderHistory />}
        {selectedTab === 2 && <FavoriteProducts />}
        {selectedTab === 3 && <Reviews />}
      </div>
    </div>
  );
};

export default MyPage;
