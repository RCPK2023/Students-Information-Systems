import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1337/api/users/login",
        { email, password }
      );
      if (response.data.message && response.data.userType === "User") {
        alert("Login successful!");
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("type", "User");
        navigate("/");
      }else if(response.data.message && response.data.userType === "Student"){
        alert("Login successful!");
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("type", "Student");
        navigate("/studentDashboard");
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  const textFieldStyle = {
    marginBottom: "width: 250px",
  };

  return (
    <div id="login-page">
      <Typography variant="h3">LOGIN</Typography>

      <div id="login-container">
        <TextField
          value={email}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          style={textFieldStyle}
        ></TextField>

        <FormControl
          sx={{
            m: 1,
            width: "24ch",
            marginLeft: "0",
            marginTop: "0",
            marginBottom: "25px",
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            value={password}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

          {/* Check first if the textboxes are empty before proceeding */}
        <Button variant="contained" onClick={handleInput} sx={{ width: 100 }}>
          Login
        </Button>

        <Link href="/signup">Don't have an account? Sign up today!</Link>
      </div>
    </div>
  );
};

export default Login;
