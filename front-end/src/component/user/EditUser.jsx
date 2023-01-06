import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import ApiService from "../../ApiService";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import eusercss from "./css/euser.module.css";

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const fetchUserByIDHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.fetchUserByID(location.state.id);
      if (response.status < 200 || response.status > 299) {
        throw new Error("Something went wrong!");
      }
      const data = await response.data;
      setUser(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [location.state.id]);

  useEffect(() => {
    fetchUserByIDHandler();
  }, [fetchUserByIDHandler, location]);

  const editUserHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    for (const key in user) {
      if (user[key] === "" && ["borrow1", "borrow2", "borrow3", "donate"].includes(key)) {
        user[key] = "X";
      }
      if (user[key] === "" && key === "uid") {
        user[key] = "00 00 00 00";
      }
      if (user[key] !== undefined) {
        formData.append(key, user[key]);
      }
    }
    try {
      const response = await ApiService.editUser(formData);
      if (response.status < 200 || response.status > 299) {
        throw new Error("Something went wrong!");
      }
      navigate("/users");
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const onChangeHandler = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isEmptyObj = (obj) => {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  };

  let content = <h5>회원 정보를 가져오지 못했습니다.</h5>;
  if (!isEmptyObj(user)) {
    content = (
      <form className={eusercss.form}>
        <div>
          <TextField
            type="text"
            name="id"
            label="구분 아이디"
            sx={{ m: 1, width: "45ch" }}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">ID: </InputAdornment>
              ),
            }}
            variant="standard"
            value={user.id || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="name"
            label="회원명"
            sx={{ m: 1, width: "45ch" }}
            variant="standard"
            value={user.name || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            type={showPassword ? "text" : "password"}
            name="pw"
            label="비밀번호"
            sx={{ m: 1, width: "45ch" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className={eusercss.iconCell}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
            value={user.pw || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="borrow1"
            label="빌린 책(1)"
            sx={{ m: 1, width: "45ch" }}
            variant="standard"
            value={user.borrow1 || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="borrow2"
            label="빌린 책(2)"
            sx={{ m: 1, width: "45ch" }}
            variant="standard"
            value={user.borrow2 || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="borrow3"
            label="빌린 책(3)"
            sx={{ m: 1, width: "45ch" }}
            variant="standard"
            value={user.borrow3 || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="donate"
            label="기부한 책"
            sx={{ m: 1, width: "45ch" }}
            variant="standard"
            value={user.donate || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="uid"
            label="RFID"
            sx={{ m: 1, width: "45ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">RFID: </InputAdornment>
              ),
            }}
            variant="standard"
            value={user.uid || ""}
            onChange={onChangeHandler}
          />
        </div>
        <Button
          className={eusercss.editBtn}
          variant="contained"
          onClick={editUserHandler}
        >
          저장
        </Button>
      </form>
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
      <Typography className={eusercss.typo} variant="h6">
        <Box className={eusercss.typoBox}>{user.name}</Box>의 회원 정보 수정
      </Typography>
      {content}
    </>
  );
};

export default EditUser;
