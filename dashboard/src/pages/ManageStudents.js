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

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFirstName("");
    setLastName("");
    setMiddleName("");
    setCourse("");
    setYear("");
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

      axios
        .get("http://localhost:1337/api/viewStudents")
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    } catch (error) {
      console.error("Error updating students", error);
    }
  };

  //Gets the students
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/viewStudents`
        );

        setStudents(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudent();
  }, []);

  async function handleAddStudent() {
    const studentData = {
      IdNumber,
      FirstName,
      LastName,
      MiddleName,
      Course,
      Year,
    };

    const isIdValid = validateId();
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isMiddleNameValid = validateMiddleName();
    const isCourseValid = validateCourse();
    const isYearValid = validateYear();

    if (isExistingStudent(IdNumber)) {
      setIdError(true);
      alert("Student with this ID already exists.");
      return;
    }

    if (
      isIdValid &&
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
      if (!isFirstNameValid) setFirstNameError(true);
      if (!isLastNameValid) setLastNameError(true);
      if (!isMiddleNameValid) setMiddleNameError(true);
      if (!isCourseValid) setCourseError(true);
      if (!isYearValid) setYearError(true);
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
              sx={{ width: "200px" }}
            />

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
              label="Course"
              variant="outlined"
              value={Course}
              style={textFieldStyle}
              onChange={(e) => setCourse(e.target.value)}
            />
            <br />

            <FormControl>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Year}
                onChange={(e) => setYear(e.target.value)}
                label="Year"
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
                <TableCell align="right">Student Id</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Middle Name</TableCell>
                <TableCell align="right">Course</TableCell>
                <TableCell align="right">Year</TableCell>
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
                            id="outlined-basic"
                            label="Student ID"
                            variant="outlined"
                            style={textFieldStyle}
                            value={editableStudent?.IdNumber || ""}
                            onKeyDown={handleKeyDown}
                            onChange={(e) =>
                              setEditableStudent((prevState) => ({
                                ...prevState,
                                IdNumber: e.target.value,
                              }))
                            }
                          />

                          <TextField
                            id="outlined-basic"
                            label="First Name"
                            variant="outlined"
                            style={textFieldStyle}
                            value={editableStudent?.firstName || ""}
                            onKeyDown={handleKeyDown}
                            onChange={(e) =>
                              setEditableStudent((prevState) => ({
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
                            value={editableStudent?.lastName || ""}
                            style={textFieldStyle}
                            onKeyDown={handleKeyDown}
                            onChange={(e) =>
                              setEditableStudent((prevState) => ({
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
                            value={editableStudent?.middleName || ""}
                            style={textFieldStyle}
                            onChange={(e) =>
                              setEditableStudent((prevState) => ({
                                ...prevState,
                                middleName: e.target.value,
                              }))
                            }
                          />
                          <br />

                          <TextField
                            id="outlined-basic"
                            label="Course"
                            variant="outlined"
                            value={editableStudent?.email || ""}
                            style={textFieldStyle}
                            onChange={(e) =>
                              setEditableStudent((prevState) => ({
                                ...prevState,
                                email: e.target.value,
                              }))
                            }
                          />
                          <br />

                          <FormControl>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Year}
                onChange={(e) => setYear(e.target.value)}
                label="Year"
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
