import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import ApiService from "../../ApiService";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);

  const fetchBooksHandler = useCallback(() => {
    ApiService.fetchUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("fetchBooksHandler() Error!", err);
      });
  }, []);

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler]);

  // deleteUser = (userID) => {
  //   ApiService.deleteUser(userID)
  //     .then((res) => {
  //       this.setState({
  //         message: "User Deleted Successfully.",
  //       });
  //       this.setState({
  //         users: this.state.users.filter((user) => user.id !== userID),
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("deleteUser() Error!", err);
  //     });
  // };

  // editUser = (ID) => {
  //   window.localStorage.setItem("userID", ID);
  //   props.history.push("/edit-user");
  // };

  // addUser = () => {
  //   window.localStorage.removeItem("userID");
  //   props.history.push("/add-user");
  // };

  return (
    <>
      <Typography variant="h4" style={style}>
        <Link to={'/users'}>회원 목록</Link>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        // onClick={addUser}
      >
        {" "}회원 추가{" "}
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">UserID</TableCell>
            <TableCell align="right">PW</TableCell>
            <TableCell align="right">UserName</TableCell>
            <TableCell align="right">donate</TableCell>
            <TableCell align="right">borrow1</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="user">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.uid}</TableCell>
              <TableCell align="right">{user.pw}</TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.donate}</TableCell>
              <TableCell align="right">{user.borrow1}</TableCell>
              <TableCell
                align="right"
                // onClick={() => editUser(user.id)}
              >
                <CreateIcon />
              </TableCell>
              <TableCell
                align="right"
                // onClick={() => deleteUser(user.id)}
              >
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

const style = {
  display: "flex",
  justifyContent: "center",
};

export default UserList;
