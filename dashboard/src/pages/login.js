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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./login.css";

//create useState and hook into both the stuff, then put it as a website storage or something then do something 
//that something being an authentication, maybe a session token?
const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = () => {
    alert("Email: " + email + "\nPassword: " + password)
  }

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

        
        <Button variant="contained" onClick={handleInput}> 
            Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
