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


  useEffect(() => {
    fetch('/api/users') 
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

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
              onKeyDown={handleKeyDown}
            />
            <br />

            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              onKeyDown={handleKeyDown}
            />
            <br />

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onKeyDown={handleKeyDown}
            />
            <br />

            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
            />
            <br />

            <Button onClick={handleClose}></Button>
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
                <TableCell align="right">Type</TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{user.FirstName}</TableCell>
                <TableCell align="right">{user.lastName}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.password}</TableCell>

              </TableRow>
            ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default ViewUsers;
