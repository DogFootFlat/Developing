import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../ApiService";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import userscss from "./css/users.module.css";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const fetchBooksHandler = useCallback(async () => {
    await ApiService.fetchUsers()
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

  async function deleteUser(userID) {
    ApiService.deleteUser(userID)
      .then((res) => {
        console.log("User Deleted Successfully.");
        setUsers(users.filter((user) => user.id !== userID));
      })
      .catch((err) => {
        console.log("deleteUser() Error!", err);
      });
  }

  return (
    <>
      <Typography className={userscss.typo} variant="h6">
        버튼을 클릭하여 회원 추가
      </Typography>
      <Button className={userscss.addbtn} variant="contained" color="primary">
        <Link to={"/add-user"} className={userscss.link}>
          {" "}
          회원 추가{" "}
        </Link>
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
              <TableCell align="right">
                <Link to={"/edit-user"}>
                  <CreateIcon />
                </Link>
              </TableCell>
              <TableCell
                align="right"
                className={userscss.delicon}
                onClick={() => deleteUser(user.id)}
              >
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserList;
