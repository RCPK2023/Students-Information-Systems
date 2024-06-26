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

import "./ManageStudents.css";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ViewUsers() {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleOpen = () => setOpen(true );
  const handleClose = () => {
    setOpen(false);
    setIdNumber("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setMiddleName("");
    setCourse("");
    setYear("");

    setIdError(false);
    setPasswordError(false);
   setFirstNameError(false);
   setLastNameError(false);
   setMiddleNameError(false);
   setCourseError(false);
   setYearError(false);

  };
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editableStudent, setEditableStudent] = useState();

  const [IdNumber, setIdNumber] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [Course, setCourse] = useState("");
  const [Year, setYear] = useState("");
  const [Password, setPassword] = useState("");

  const [IdError, setIdError] = useState(false);
  const [FirstNameError, setFirstNameError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
  const [MiddleNameError, setMiddleNameError] = useState(false);
  const [CourseError, setCourseError] = useState(false);
  const [YearError, setYearError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);

  const validateId = () => IdNumber.trim() !== "" && IdNumber.length === 8;
  const validateFirstName = () => FirstName.trim() !== "";
  const validateLastName = () => LastName.trim() !== "";
  const validateMiddleName = () => MiddleName.trim() !== "";
  const validateCourse = () => Course.trim() !== "";
  const validateYear = () => Year !== "";
  const validatePassword = () => Password !== "";

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const styleButton = {
    width: "200px",
    marginBottom: "15px",
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

  const styleInput = {
    width: 200
  }
  //Gets the students
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/viewStudents`
        );
        console.log(response);
        setStudents(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudent();
  }, [students]);

  const handleEditStudent = (studentID) => {
  
    const studentToEdit = students.find((Students) => Students._id === studentID);
  
    if (studentToEdit) {
      setEditableStudent(studentToEdit);
      setSelectedStudent(studentID);
      setOpenEdit(true);
    } else {
      console.error("Selected Students data not found");
    }
  };

  const saveEditedUser = () => {
    try {
      const studentID = editableStudent._id;

      axios.put(`http://localhost:1337/api/updateStudents/${studentID}`, editableStudent);
      console.log("Students updated successfully: ");
      setEditableStudent(null);
      setOpenEdit(false);

      //add here
    } catch (error) {
      console.error("Error updating students", error);
    }
  };

  async function handleAddStudent() {
    const studentData = {
      IdNumber,
      Password,
      FirstName,
      LastName,
      MiddleName,
      Course,
      Year,
    };

    const isIdValid = validateId();
    const isPasswordValid = validatePassword();
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isMiddleNameValid = validateMiddleName();
    const isCourseValid = validateCourse();
    const isYearValid = validateYear();


    const isExistingStudent = (id) => {
      return students.some((student) => student.IdNumber === id);
    };

    if (isExistingStudent(IdNumber)) {
      setIdError(true);
      alert("Student with this ID already exists.");
      return;
    }

    if (
      isIdValid &&
      isPasswordValid &&
      isFirstNameValid &&
      isLastNameValid &&
      isMiddleNameValid &&
      isCourseValid &&
      isYearValid 
    ) {
      try {
        const response = await axios.post(`http://localhost:1337/api/addStudents`, studentData)

        if (response.data.success) {
          setIdNumber("");
          setFirstName("");
          setLastName("");
          setMiddleName("");
          setCourse("");
          setYear("");
          setPassword("");
          alert(response.data.message);
        } else {
          alert("Failed to add student. Please try again.");
        }
      } catch (error) {
        console.error("Error adding student:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      if (!isIdValid) setIdError(true);
      if (!isYearValid) setYearError(true);
      if (!isPasswordValid) setPasswordError(true);
      if (!isFirstNameValid) setFirstNameError(true);
      if (!isLastNameValid) setLastNameError(true);
      if (!isMiddleNameValid) setMiddleNameError(true);
      if (!isCourseValid) setCourseError(true);

    }
  }

  return (
    <div id="viewUser-Container">
      <Sidebar></Sidebar>

      <Container sx={containerStyle}>
        <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
          <Typography variant="h3">Add Students</Typography>
        </Box>

        <Button variant="contained" onClick={handleOpen}>
          Add Students
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>

          <TextField
              error={IdError}
              helperText={
                IdError ? "ID must be 8 characters long and is unique" : ""
              }
              id="outlined-basic"
              label="ID Number"
              variant="outlined"
              value={IdNumber}
              type="number"
              onChange={(e) => setIdNumber(e.target.value)}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 8);
              }}
              sx={styleButton}
            />

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
                sx={styleInput}
                type={showPassword ? "text" : "password"}
                error={PasswordError}
                helperText={
                  PasswordError ? "Password is required" : ""
                }
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

            <TextField
              error={FirstNameError}
              helperText={FirstNameError ? "First Name is required" : ""}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={FirstName}
              onKeyDown={handleKeyDown}
              onChange={(e) => setFirstName(e.target.value)}
              sx={styleButton}
            />
            <TextField
              error={LastNameError}
              helperText={LastNameError ? "Last Name is required" : ""}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={LastName}
              onKeyDown={handleKeyDown}
              onChange={(e) => setLastName(e.target.value)}
              sx={styleButton}
            />
            <TextField
              error={MiddleNameError}
              helperText={MiddleNameError ? "Middle Name is required" : ""}
              id="outlined-basic"
              label="Middle Name"
              variant="outlined"
              value={MiddleName}
              onChange={(e) =>
                setMiddleName(e.target.value.slice(0, 1).toUpperCase())
              }
              onKeyDown={(e) => {
                if (MiddleName.length >= 1 && e.key !== "Backspace") {
                  e.preventDefault();
                }
                if (!/^[a-zA-Z]+$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              sx={styleButton}
            />

            <TextField
              error={CourseError}
              helperText={CourseError ? "Course is required" : ""}
              id="outlined-basic"
              label="Course"
              variant="outlined"
              value={Course}
              onChange={(e) => setCourse(e.target.value)}
              sx={styleButton}
            />

            <FormControl>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Year}
                onChange={(e) => setYear(e.target.value)}
                label="Year"
                sx={{ width: "200px" }}
                error={YearError}
                helperText={YearError ? "Year is required" : ""}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>


            <Button
              onClick={handleAddStudent}
              variant="contained"
              style={buttonStyle}
            >
              Add Students
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
              <TableCell align="right">Student Id</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Middle Name</TableCell>
                <TableCell align="right">Course</TableCell>
                <TableCell align="right">Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((Students) => (
                <TableRow
                  key={Students._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
               <TableCell align="right">{Students.IdNumber}</TableCell>
                  <TableCell align="right">{Students.FirstName}</TableCell>
                  <TableCell align="right">{Students.LastName}</TableCell>
                  <TableCell align="right">{Students.MiddleName}</TableCell>
                  <TableCell align="right">{Students.Course}</TableCell>
                  <TableCell align="right">{Students.Year}</TableCell>
                  <TableCell>
                    <Button
                      align="right"
                      variant="contained"
                      onClick={() => handleEditStudent(Students._id)}
                    >
                      EDIT
                    </Button>
                    <Modal
                      open={openEdit && selectedStudent === Students._id}
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
                          Students Information
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                        <TextField
                            disabled
                            id="outlined-basic"
                            label="ID Number"
                            variant="outlined"
                            value={Students.IdNumber}
                            sx={styleButton}
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
                sx={styleInput}
                type={showPassword ? "text" : "password"}
                error={PasswordError}
                helperText={
                  PasswordError ? "Password is required" : ""
                }
                value={Students.Password}
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

                            <TextField
                            id="outlined-basic"
                            label="First Name"
                            variant="outlined"
                            value={editableStudent?.FirstName || ""}
                            onKeyDown={handleKeyDown}
                            onChange={(e) =>
                              setEditableStudent((prevState) => ({
                                ...prevState,
                                FirstName: e.target.value,
                              }))
                            }
                            sx={styleButton}
                          />
                          <br />

                          <TextField
                            id="outlined-basic"
                            label="Last Name"
                            variant="outlined"
                            value={editableStudent?.LastName || ""}
                            onKeyDown={handleKeyDown}
                            onChange={(e) =>
                              setEditableStudent((prevState) => ({
                                ...prevState,
                                LastName: e.target.value,
                              }))
                            }
                            sx={styleButton}
                          />
                          <br />

                          <TextField
                            id="outlined-basic"
                            label="Middle Name"
                            variant="outlined"
                            value={editableStudent?.MiddleName || ""}
                            onChange={(e) =>
                              setEditableStudent((prevState) => ({
                                ...prevState,
                                MiddleName: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (
                                editableStudent?.MiddleName.length >= 1 &&
                                e.key !== "Backspace"
                              ) {
                                e.preventDefault();
                              }
                              if (!/^[a-zA-Z]+$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            sx={styleButton}
                          />
                          <br />

                          <TextField
                            id="outlined-basic"
                            label="Course"
                            variant="outlined"
                            value={editableStudent?.Course || ""}
                            onChange={(e) =>
                              setEditableStudent((prevState) => ({
                                ...prevState,
                                Course: e.target.value,
                              }))
                            }
                            sx={styleButton}
                          />
                          <br />

                          <FormControl>
                            <InputLabel id="demo-simple-select-label">
                              Year
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={editableStudent?.Year || ""}
                              label="Year"
                              sx={{ width: "200px" }}
                              onChange={(e) =>
                                setEditableStudent((prevState) => ({
                                  ...prevState,
                                  Year: e.target.value,
                                }))
                              }
                            >
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                            </Select>
                          </FormControl>

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
