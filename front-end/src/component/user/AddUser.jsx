import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import ApiService from "../../ApiService";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ausercss from "./css/auser.module.css";

const AddUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [pwError, setPwError] = useState(false);

  const onChangeHandler = (event) => {
    if (event.target.name === "name") {
      setNameError(false);
    }
    if (event.target.name === "pw") {
      setPwError(false);
    }
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const nameInputRef = useRef();
  const pwInputRef = useRef();

  const addUserHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!nameError && !pwError) {
      const formData = new FormData();
      for (const key in user) {
        if (
          user[key] === "" &&
          ["borrow1", "borrow2", "borrow3", "donate"].includes(key)
        ) {
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
        const response = await ApiService.addUser(formData);
        if (response.status < 200 || response.status > 299) {
          throw new Error("Something went wrong!");
        }
        navigate("/users");
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    } else if (nameError) {
      nameInputRef.current.focus();
    } else {
      pwInputRef.current.focus();
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let content = (
    <form className={ausercss.form}>
      <div>
        <TextField
          type="text"
          name="id"
          label="구분 아이디"
          sx={{ m: 1, width: "45ch" }}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">ID: 자동생성</InputAdornment>
            ),
          }}
          variant="standard"
          value={user.id || ""}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <TextField
          autoFocus
          required
          error={nameError}
          type="text"
          name="name"
          label="회원명"
          ref={nameInputRef}
          sx={{ m: 1, width: "45ch" }}
          variant="standard"
          value={user.name || ""}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <TextField
          required
          error={pwError}
          type={showPassword ? "text" : "password"}
          name="pw"
          label="비밀번호"
          lef={pwInputRef}
          sx={{ m: 1, width: "45ch" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  className={ausercss.iconCell}
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
        className={ausercss.addBtn}
        variant="contained"
        disabled={!nameError && !pwError}
        onClick={addUserHandler}
      >
        저장
      </Button>
    </form>
  );
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
      <Typography className={ausercss.typo} variant="h6">
        회원 추가
      </Typography>
      {content}
    </>
  );
};

export default AddUser;
