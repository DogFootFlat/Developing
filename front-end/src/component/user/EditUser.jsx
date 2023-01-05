import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import ApiService from "../../ApiService";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Button, Input } from "@material-ui/core";
import { Box } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const EditUser = (props) => {
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
  }, []);

  useEffect(() => {
    fetchUserByIDHandler();
  }, [fetchUserByIDHandler]);

  const editUserHandler = (e) => {
    e.preventDefault();
    var formData = new FormData();
    for (var key in user) {
      if (user[key] !== undefined) {
        formData.append(key, user[key]);
      }
    }

    ApiService.editUser(formData)
      .then((res) => {
        console.log(formData.get("name") + "의 정보가 수정되었습니다.");
        navigate("/users");
      })
      .catch((err) => {
        console.log("editBookHandler() Error!", err);
      });
  };

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Typography variant="h6" style={style}>
        <Box sx={{ textTransform: "uppercase" }}>{user.name}</Box>의 회원 정보
        수정
      </Typography>
      <form style={{ marginTop: "3em" }}>
        <div>
          <TextField
            type="text"
            name="name"
            label="구분 아이디"
            sx={{ m: 1, width: "45ch" }}
            readOnly={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">ID</InputAdornment>
              ),
            }}
            variant="standard"
            value={user.username}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="name"
            label="회원명"
            sx={{ m: 1, width: "45ch" }}
            variant="standard"
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
                    sx={{ width: "3ch" }}
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
          />
        </div>
        <div>
          <Button variant="contained" color="primary" style={{ marginTop: "2.5em" }} onClick={editUserHandler}>
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

const style = {
  display: "flex",
  justifyContent: "center",
};

export default EditUser;
