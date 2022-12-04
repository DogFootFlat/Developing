import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserListComponent from "../user/UserListComponent";
import AddUserComponent from "../user/AddUserComponent";
import EditUserComponent from "../user/EditUserComponent";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <div style={style}>
          <Routes>
            <Route exact path="/" element={<UserListComponent />} />
            <Route path="/users" element={<UserListComponent />} />
            <Route path="/add-user" element={<AddUserComponent />} />
            <Route path="/edit-user" element={<EditUserComponent />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

export default AppRouter;
