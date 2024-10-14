import React, { useEffect, useState } from 'react';
import styles from './css/OrderHistory.module.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Mock API call to fetch order history
    const fetchOrderHistory = async () => {
      // You can replace this with a real API call
      const mockOrderHistory = [
        {
          orderId: 'ORD123456',
          date: '2024-09-10',
          status: '배송 완료',
          items: [
            { productName: '오디너리 스트라이프 반팔 니트', quantity: 1, price: 19900 },
            { productName: '오버핏 데님 자켓', quantity: 1, price: 59000 },
          ],
        },
        {
          orderId: 'ORD789101',
          date: '2024-08-20',
          status: '배송 중',
          items: [
            { productName: '빈티지 가죽 신발', quantity: 2, price: 89000 },
          ],
        },
      ];
      setOrders(mockOrderHistory);
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className={styles.orderHistory}>
      <h2>주문 내역</h2>
      {orders.length === 0 ? (
        <p>주문 내역이 없습니다.</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className={styles.order}>
            <div className={styles.orderHeader}>
              <span>주문 번호: {order.orderId}</span>
              <span>주문 날짜: {order.date}</span>
              <span>상태: {order.status}</span>
            </div>
            <div className={styles.orderItems}>
              {order.items.map((item, index) => (
                <div key={index} className={styles.orderItem}>
                  <span>{item.productName}</span>
                  <span>수량: {item.quantity}</span>
                  <span>가격: {item.price.toLocaleString()}원</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
