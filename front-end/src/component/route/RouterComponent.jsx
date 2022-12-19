import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookList from "../user/BookList";
import UserList from "../user/UserList";
import ListExample from "../user/ListExample";
import AddExample from "../user/AddExample";
import EditExample from "../user/EditExample";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <div style={style}>
          <Routes>
            <Route exact path="/" element={<UserList />} />
            {/* <Route path="/books" element={<BookList />} /> */}
            <Route path="/users" element={<UserList />} />
            <Route path="/examples" element={<ListExample />} />
            <Route path="/add-example" element={<AddExample />} />
            <Route path="/edit-example" element={<EditExample />} />
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
