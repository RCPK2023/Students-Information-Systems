import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import "./ViewUsers.css";
import axios from "axios";

function ViewUsers() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [users, setUsers] = useState([]);

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const isLetter = (event) => {
    const LETTERS_ONLY_REGEX = /^[a-zA-Z\s]+$/;
    return LETTERS_ONLY_REGEX.test(event.key);
  };

  const handleKeyDown = (event) => {
    if (!isLetter(event)) {
      event.preventDefault();
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 1,
    p: 4,
  };

  useEffect(() =>{
    axios
    .get('http://localhost:1337/api/users')
    .then((response) =>{
      setUsers(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data", error);
    })
  })

  const handleAddUser = async () => {
    const UserData = {
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      password: Password,
    };

    try {
      await axios.post('http://localhost:1337/api/users', UserData);
      console.log("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div id="viewUser-Container">
      <Sidebar></Sidebar>

      <Container>
        <Typography variant="h3">Add Users</Typography>

        <Button variant="contained" onClick={handleOpen}>
          Add User
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={FirstName}
              onKeyDown={handleKeyDown}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />

            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={LastName}
              onKeyDown={handleKeyDown}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />


            <Button onClick={handleAddUser} variant="contained">
              Add User
              </Button> 

            <Button onClick={handleClose} variant="contained">
              Close
              </Button> 


          </Box>
        </Modal>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Password</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{user.firstName}</TableCell>
                <TableCell align="right">{user.lastName}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.password}</TableCell>

              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default ViewUsers;
