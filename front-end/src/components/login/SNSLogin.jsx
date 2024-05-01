import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import ApiService from "../../ApiService";
import AuthContext from "../../store/auth-context";
import Loading from "../basic/Loading";
import {
  Typography,
  Button,
} from "@mui/material";
import ausercss from "./css/auser.module.css";

const SNSLogin = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const [book, setBook] = useState({});
  const [nameIsValid, setNameIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(true);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ctx.setCurrentPage("add-book");
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(nameIsValid);
    }, 500)

    return () => {
      clearTimeout(identifier);
    };
  }, [nameIsValid])

  const onChangeHandler = (event) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };
  const validateNameHandler = () => {
    setNameIsValid(book.name !== "");
  };

  const nameInputRef = useRef();

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
      <Button
        type="submit"
        className={ausercss.addBtn}
        variant="contained"
      >
        카카오톡<br/>
        회원가입
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
        회원 가입 페이지
      </Typography>
      {content}
    </>
  );
};

export default SNSLogin;
