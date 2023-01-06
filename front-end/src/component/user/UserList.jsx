import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
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

const UserList = () => {
  const navigate = useNavigate();
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

  const deleteUserHandler = async (userID) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.deleteUser(userID);
      if (response.status < 200 || response.status > 299) {
        throw new Error("Something went wrong!");
      }
        setUsers(users.filter((user) => user.id !== userID));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const moveToEditUserHandler = (userId) => {
    navigate("/edit-user", {
      state: {
        id: userId,
      },
    });
  };

  let content = <h5>현재 회원 목록이 비어있습니다.</h5>;
  if (users.length > 0) {
    content = (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={userscss.idCell}>ID</TableCell>
            <TableCell>회원명</TableCell>
            <TableCell>비밀번호</TableCell>
            <TableCell>빌린 책(1)</TableCell>
            <TableCell>빌린 책(2)</TableCell>
            <TableCell>빌린 책(3)</TableCell>
            <TableCell>RFID</TableCell>
            <TableCell align="center">편집</TableCell>
            <TableCell align="center">삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell
                className={userscss.idCell}
                component="th"
                scope="user"
              >
                {user.id}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.pw}</TableCell>
              <TableCell>{user.borrow1}</TableCell>
              <TableCell>{user.borrow2}</TableCell>
              <TableCell>{user.borrow3}</TableCell>
              <TableCell>{user.uid}</TableCell>
              <TableCell className={userscss.iconCell}>
                <CreateIcon
                  className={userscss.hover}
                  onClick={() => moveToEditUserHandler(user.id)}
                />
              </TableCell>
              <TableCell className={userscss.iconCell}>
                <DeleteIcon
                  className={userscss.hover}
                  onClick={() => deleteUserHandler(user.id)}
                />
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
      <Button className={userscss.addBtn} variant="contained" color="primary">
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
