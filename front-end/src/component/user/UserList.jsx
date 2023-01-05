import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../ApiService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import userscss from "./css/users.module.css";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.fetchUsers();
      if (response.status < 200 || response.status > 299) {
        throw new Error("Something went wrong!");
      }
      const data = await response.data;
      setUsers(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  const deleteUserHandler = useCallback(async (userID) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.deleteUser(userID);
      if (response.status < 200 || response.status > 299) {
        console.log("Something went wrong!");
        throw new Error("Something went wrong!");
      }
      const data = await response.data;
      console.log(data);
      setUsers(users.filter((user) => user.id !== userID));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  });

  let content = <h5>현재 회원 목록이 비어있습니다.</h5>;
  if (users.length > 0) {
    content = (
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
                onClick={() => deleteUserHandler(user.id)}
              >
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  if (error) {
    content = (
      <div>
        <p>{error}</p>
      </div>
    );
  }
  if (isLoading) {
    content = (
      <div style={{ marginTop: "10em" }}>
        <CircularProgress />
      </div>
    );
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
      {content}
    </>
  );
};

export default UserList;
