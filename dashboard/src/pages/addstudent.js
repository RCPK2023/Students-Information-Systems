import {
  Button,
  Typography,
  TextField,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import "./addstudent.css";
import { useState } from "react";
import axios from "axios";

function Addstudent() {
  const [IdNumber, setIdNumber] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [Course, setCourse] = useState("");
  const [Year, setYear] = useState("");

  const validateId = () => IdNumber.trim() !== "" && IdNumber.length === 8;
  const validateFirstName = () => FirstName.trim() !== "";
  const validateLastName = () => LastName.trim() !== "";
  const validateMiddleName = () => MiddleName.trim() !== "";
  const validateCourse = () => Course.trim() !== "";
  const validateYear = () => Year !== "";

  const [IdError, setIdError] = useState(false);
  const [FirstNameError, setFirstNameError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
  const [MiddleNameError, setMiddleNameError] = useState(false);
  const [CourseError, setCourseError] = useState(false);
  const [YearError, setYearError] = useState(false);

  const [Students, setStudents] = useState([]);
  const [editableStudent, setEditableStudent] = useState();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/students`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  const handleOpen = (studentId) => {
    const studentToEdit = Students.find(
      (student) => student.IdNumber === studentId
    );

    if (studentToEdit) {
      setEditableStudent(studentToEdit);
      setSelectedStudent(studentId);
      setOpen(true);
    } else {
      console.error("Selected student data not found");
    }
  };

  const isExistingStudent = (id) => {
    return Students.some((student) => student.IdNumber === id);
  };

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

  const isLetter = (event) => {
    const LETTERS_ONLY_REGEX = /^[a-zA-Z\s]+$/;
    return LETTERS_ONLY_REGEX.test(event.key);
  };

  const handleKeyDown = (event) => {
    if (!isLetter(event)) {
      event.preventDefault();
    }
  };

  return (
    <div id="container">
      <Sidebar />

      <Container id="form-container">
        <Typography variant="h3" id="title">
          ADD STUDENT
        </Typography>
        {
          <div id="input-container">
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
              sx={{ width: "200px" }}
            />
            <TextField
              error={FirstNameError}
              helperText={FirstNameError ? "First Name is required" : ""}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={FirstName}
              onKeyDown={handleKeyDown}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ width: "200px" }}
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
              sx={{ width: "200px" }}
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
              sx={{ width: "200px" }}
            />

            <TextField
              error={CourseError}
              helperText={CourseError ? "Course is required" : ""}
              id="outlined-basic"
              label="Course"
              variant="outlined"
              value={Course}
              onChange={(e) => setCourse(e.target.value)}
              sx={{ width: "200px" }}
            />

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

            <Button
              variant="contained"
              onClick={handleAddStudent}
              sx={{ width: "200px" }}
            >
              Add Student
            </Button>
          </div>
        }
      </Container>

      <h1></h1>
    </div>
  );
}

export default Addstudent;
