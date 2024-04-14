import { Container, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: "",
  });

  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handlePassword = () => {
    let isCorrect;

    if (user.password === confirmedPassword) {
      isCorrect = true;
    } else {
      isCorrect = false;
    }

    return isCorrect;
  };

  const clearFields = () => {
    setUser({
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      password: "",
    });

    setConfirmedPassword("");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "email") {
      processedValue = value.toLowerCase();
    }

    setUser({ ...user, [name]: processedValue });
  };

  const isFieldsDone = () => {
    let isDone = false;

    if (
      user.firstName !== "" &&
      user.lastName !== "" &&
      user.middleName !== "" &&
      user.email !== "" &&
      user.password !== ""
    ) {
      isDone = true;
    }

    return isDone;
  };

  const handleUserSignUp = () => {
    if (handlePassword() && isFieldsDone()) {
      console.log("The user data: ", user);
      if (checkExistingUsers(user)) {
        clearFields();
        alert("Successfully signed-up!");
        navigate("/");
      } else {
        clearFields();
        alert("Account already created, please create another one!");
      }
    } else {
      alert("Correctly add into the forms");
    }
  };

  const checkExistingUsers = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:1337/api/users",
        user
      );
      return response.data.success;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="signup-page">
      <div id="signup-container">
        <TextField
          value={user.firstName}
          id="outlined-basic"
          label="First Name"
          name="firstName"
          variant="outlined"
          onChange={handleInput}
        ></TextField>

        <TextField
          value={user.lastName}
          id="outlined-basic"
          label="Last Name"
          name="lastName"
          variant="outlined"
          onChange={handleInput}
        ></TextField>

        <TextField
          value={user.middleName}
          id="outlined-basic"
          label="Middle Name"
          name="middleName"
          variant="outlined"
          onChange={handleInput}
        ></TextField>

        <TextField
          value={user.email}
          id="outlined-basic"
          label="Email"
          name="email"
          variant="outlined"
          onChange={handleInput}
        ></TextField>

        <TextField
          value={user.password}
          id="outlined-basic"
          label="Password"
          name="password"
          variant="outlined"
          onChange={handleInput}
        ></TextField>

        <TextField
          value={confirmedPassword}
          id="outlined-basic"
          label="Confirm Password"
          name="confirmPassword"
          variant="outlined"
          onChange={(e) => {
            setConfirmedPassword(e.target.value);
          }}
        ></TextField>

        <Button variant="contained" onClick={handleUserSignUp}>
          Sign-Up!
        </Button>
      </div>
    </div>
  );
}

export default Signup;
