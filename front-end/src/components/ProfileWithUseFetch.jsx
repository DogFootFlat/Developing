import React from "react";
import useFetch from "./useFetch";

function Profile() {
  const {
    loading,
    data: user,
    error,
  } = useFetch(`http://localhost:8080/books`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <ul>
      <li>id: {user[0].id}</li>
      <li>name: {user[0].name}</li>
    </ul>
  );
}

export default Profile;