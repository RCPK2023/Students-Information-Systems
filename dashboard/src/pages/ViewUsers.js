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
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import "./ViewUsers.css";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ViewUsers() {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFirstName("");
    setLastName("");
    setMiddleName("");
    setEmail("");
    setPassword("");
  };
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editableUser, setEditableUser] = useState();

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isLetter = (event) => {
    const LETTERS_ONLY_REGEX = /^[a-zA-Z\s]+$/;
    return LETTERS_ONLY_REGEX.test(event.key);
  };

  const handleKeyDown = (event) => {
    if (!isLetter(event)) {
      event.preventDefault();
    }
  };

  const textFieldStyle = {
    marginBottom: "20px",
  };

  const buttonStyle = {
    marginRight: "20px",
  };

  const containerStyle = {
    margin: "2",
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    boxShadow: 1,
    p: 4,
  };

  const styleEdit = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    boxShadow: 1,
    p: 4,
  };

  const handleEditUser = (userID) => {
    const userToEdit = users.find((user) => user._id === userID);

    if (userToEdit) {
      setEditableUser(userToEdit);
      setSelectedUser(userID);
      setOpenEdit(true);
    } else {
      console.error("Selected user data not found");
    }
  };

  const saveEditedUser = () => {
    try {
      const userID = editableUser._id;

      axios.put(`http://localhost:1337/api/users/${userID}`, editableUser);
      console.log("User updated successfully: ");
      setEditableUser(null);
      setOpenEdit(false);

      axios
        .get("http://localhost:1337/api/users")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    } catch (error) {
      console.error("Error updating users", error);
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:1337/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  });

  const handleAddUser = async () => {
    const UserData = {
      firstName: FirstName,
      lastName: LastName,
      middleName: MiddleName,
      email: Email,
      password: Password,
    };

    try {
      const response = await axios.post(
        "http://localhost:1337/api/users",
        UserData
      );

      if (response.data.success) {
        setFirstName("");
        setLastName("");
        setMiddleName("");
        setEmail("");
        setPassword("");
        alert("User added successfully");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div id="viewUser-Container">
      <Sidebar></Sidebar>

      <Container sx={containerStyle}>
        <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
          <Typography variant="h3">Add Users</Typography>
        </Box>

        <Button variant="contained" onClick={handleOpen}>
          Add User
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              style={textFieldStyle}
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
              style={textFieldStyle}
              onKeyDown={handleKeyDown}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />

            <TextField
              id="outlined-basic"
              label="Middle Name"
              variant="outlined"
              value={MiddleName}
              style={textFieldStyle}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <br />

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={Email}
              style={textFieldStyle}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <FormControl
              sx={{
                m: 1,
                width: "25ch",
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
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={Password}
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

            <Button
              onClick={handleAddUser}
              variant="contained"
              style={buttonStyle}
            >
              Add User
            </Button>

            <Button onClick={handleClose} variant="contained">
              Close
            </Button>
          </Box>
        </Modal>

        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Middle Name</TableCell>
                <TableCell align="right">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{user.firstName}</TableCell>
                  <TableCell align="right">{user.lastName}</TableCell>
                  <TableCell align="right">{user.middleName}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell>
                    <Button
                      align="right"
                      variant="contained"
                      onClick={() => handleEditUser(user._id)}
                    >
                      EDIT
                    </Button>
                    <Modal
                      open={openEdit && selectedUser === user._id}
                      onClose={handleEditClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={styleEdit}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          User Information
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <TextField
                            id="outlined-basic"
                            label="First Name"
                            variant="outlined"
                            style={textFieldStyle}
                            value={editableUser?.firstName || ""}
                            onKeyDown={handleKeyDown}
                            onChange={(e) =>
                              setEditableUser((prevState) => ({
                                ...prevState,
                                firstName: e.target.value,
                              }))
                            }
                          />
                          <br />

                          <TextField
                            id="outlined-basic"
                            label="Last Name"
                            variant="outlined"
                            value={editableUser?.lastName || ""}
                            style={textFieldStyle}
                            onKeyDown={handleKeyDown}
                            onChange={(e) =>
                              setEditableUser((prevState) => ({
                                ...prevState,
                                lastName: e.target.value,
                              }))
                            }
                          />
                          <br />

                          <TextField
                            id="outlined-basic"
                            label="Middle Name"
                            variant="outlined"
                            value={editableUser?.middleName || ""}
                            style={textFieldStyle}
                            onChange={(e) =>
                              setEditableUser((prevState) => ({
                                ...prevState,
                                middleName: e.target.value,
                              }))
                            }
                          />
                          <br />

                          <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            value={editableUser?.email || ""}
                            style={textFieldStyle}
                            onChange={(e) =>
                              setEditableUser((prevState) => ({
                                ...prevState,
                                email: e.target.value,
                              }))
                            }
                          />
                          <br />

                          <FormControl
                            sx={{
                              m: 1,
                              width: "25ch",
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
                              id="outlined-adornment-password"
                              type={showPassword ? "text" : "password"}
                              value={editableUser?.password || ""}
                              onChange={(e) =>
                                setEditableUser((prevState) => ({
                                  ...prevState,
                                  password: e.target.value,
                                }))}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label="Password"
                            />
                          </FormControl>

                          {/* <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            value={editableUser?.password || ""}
                            style={textFieldStyle}
                            onChange={(e) =>
                              setEditableUser((prevState) => ({
                                ...prevState,
                                password: e.target.value,
                              }))
                            }
                          /> */}
                          <br />
                        </Typography>

                        <Box>
                          <Button
                            variant="contained"
                            onClick={saveEditedUser}
                            sx={{ width: "100px", marginRight: "5px" }}
                          >
                            SAVE
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleEditClose}
                            sx={{ width: "100px" }}
                          >
                            CLOSE
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
                  </TableCell>
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
