import { Container, TextField, Button } from '@mui/material'
import React, { useState } from 'react'

function Signup () {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        password: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleUserSignUp = () => {
        console.log(user)
    };

  return (
    <div>
      <Container>

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
value={user.confirmPassword}
          id="outlined-basic"
          label="Confirm Password"
          name="confirmPassword"
          variant="outlined"
          onChange={handleInput}
   
        ></TextField>

<Button variant="contained" onClick={handleUserSignUp} >Sign-Up!</Button>
      </Container>
    </div>
  )
}

export default Signup
