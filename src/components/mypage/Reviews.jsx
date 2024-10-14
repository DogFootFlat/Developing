import React, { useState, useEffect } from 'react';
import classes from './css/Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Replace this with the actual API call or data fetch
    const fetchReviews = async () => {
      // Simulate a fetch call
      const dummyReviews = [
        {
          id: 1,
          title: 'Great product!',
          content: 'I absolutely loved this item. Highly recommended!',
          date: '2024-10-10',
        },
        {
          id: 2,
          title: 'Not bad',
          content: 'It was okay, but I had higher expectations.',
          date: '2024-09-21',
        },
      ];
      setReviews(dummyReviews);
    };
    
    fetchReviews();
  }, []);

  return (
    <div className={classes.reviews}>
      <h2>내 리뷰</h2>
      {reviews.length > 0 ? (
        <ul className={classes.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={classes.reviewItem}>
              <h3 className={classes.reviewTitle}>{review.title}</h3>
              <p className={classes.reviewContent}>{review.content}</p>
              <span className={classes.reviewDate}>{review.date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>아직 작성된 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default Reviews;
