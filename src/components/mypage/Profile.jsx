import React, { useState, useEffect } from 'react';
import classes from './css/Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserProfile = async () => {
      const dummyUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        joinDate: '2024-01-15',
        phoneNumber: '010-1234-5678',
      };
      setUser(dummyUser);
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className={classes.profile}>
      <h2>내 프로필</h2>
      <div className={classes.profileInfo}>
        <p><strong>이름:</strong> {user.name}</p>
        <p><strong>이메일:</strong> {user.email}</p>
        <p><strong>가입일:</strong> {user.joinDate}</p>
        <p><strong>전화번호:</strong> {user.phoneNumber}</p>
      </div>
    </div>
  );
};

export default Profile;
