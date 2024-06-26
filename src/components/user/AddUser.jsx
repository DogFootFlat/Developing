import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import ApiService from "../../ApiService";
import AuthContext from "../../store/auth-context";
import Loading from "../basic/Loading";
import {
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
  const ctx = useContext(AuthContext);

  const [user, setUser] = useState({});
  const [nameIsValid, setNameIsValid] = useState(true);
  const [pwIsValid, setPwIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(true);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    ctx.setCurrentPage("add-user");
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(nameIsValid && pwIsValid);
    }, 500)

    return () => {
      clearTimeout(identifier);
    };
  }, [nameIsValid, pwIsValid])

  const onChangeHandler = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const validateNameHandler = () => {
    setNameIsValid(user.name !== "");
  };
  const validatePwHandler = () => {
    setPwIsValid(user.pw !== "");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const nameInputRef = useRef();
  const pwInputRef = useRef();

  const addUserHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formIsValid) {
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
    } else if (!nameIsValid) {
      nameInputRef.current.focus();
    } else {
      pwInputRef.current.focus();
    }
  };

  let content = (
    <form className={ausercss.form} onSubmit={addUserHandler}>
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
          type="text"
          name="name"
          label="회원명"
          error={!nameIsValid}
          helperText={nameIsValid ? "" : "필수 작성란입니다."}
          ref={nameInputRef}
          sx={{ m: 1, width: "45ch" }}
          variant="standard"
          value={user.name || ""}
          onChange={onChangeHandler}
          onBlur={validateNameHandler}
        />
      </div>
      <div>
        <TextField
          required
          type={showPassword ? "text" : "password"}
          name="pw"
          label="비밀번호"
          error={!pwIsValid}
          helperText={pwIsValid ? "" : "필수 작성란입니다."}
          ref={pwInputRef}
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
          onBlur={validatePwHandler}
        />
      </div>
      <Button
        type="submit"
        className={ausercss.addBtn}
        variant="contained"
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
    content = <Loading />;
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
