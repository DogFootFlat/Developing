import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import ApiService from "../../ApiService";
import { TextField, Button } from "@material-ui/core";
import { Typography } from "@mui/material";

const EditUser = (props) => {
  const location = useLocation();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserByIDHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.fetchUserByID(location.state.id);
      console.log(response);
      if (response.status < 200 || response.status > 299) {
        throw new Error("Something went wrong!");
      }
      const data = await response.data;
      console.log(data);
      setUser(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUserByIDHandler();
  }, [fetchUserByIDHandler]);

  // function onChangeHandler(event) {
  //   setUser({[e.target.name]: e.target.value,})
  // }

  // function saveHandler(event) {
  //   e.preventDefault();
  //   let data = {
  //     id: user.id,
  //     password: user.password,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     age: user.age,
  //     salary: user.salary,
  //   };

  //   ApiService.editUser(data)
  //     .then((res) => {
  //       this.setState({
  //         message: data.lastName + "님 정보가 수정되었습니다.",
  //       });
  //       this.props.history.push("/users");
  //     })
  //     .catch((err) => {
  //       console.log("saveUser() 에러", err);
  //     });
  // }

  return (
    <div>
      <Typography variant="h4" style={style}>
        Edit User
      </Typography>
      <form>
        <TextField
          type="text"
          name="username"
          readOnly={true}
          fullWidth
          margin="normal"
          value={user.username}
        />

        <TextField
          placeholder="Edit your first name"
          name="firstName"
          fullWidth
          margin="normal"
          value={user.firstName}
          // onChange={this.onChange}
        />

        <TextField
          placeholder="Edit your last name"
          name="lastName"
          fullWidth
          margin="normal"
          value={user.lastName}
          // onChange={this.onChange}
        />

        <TextField
          type="number"
          placeholder="Edit your age"
          name="age"
          fullWidth
          margin="normal"
          value={user.age}
          // onChange={this.onChange}
        />

        <TextField
          type="number"
          placeholder="Edit your salary"
          name="salary"
          fullWidth
          margin="normal"
          value={user.salary}
          // onChange={this.onChange}
        />

        <Button variant="contained" color="primary">
          Save
        </Button>
      </form>
    </div>
  );
};

const style = {
  display: "flex",
  justifyContent: "center",
};

export default EditUser;
