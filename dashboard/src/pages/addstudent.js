import { Button, Typography, TextField, Container } from "@mui/material";
import React from "react";
import Sidebar from "./sidebar";
import "./addstudent.css";
import { useState } from "react";

function Addstudent() {
  const [IdNumber, setIdNumber] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [Course, setCourse] = useState("");
  const [Year, setYear] = useState("");

  //In the Add and Edit components make sensible fieldviews i.e
  // id is number and minimum of 8
  // first/last should be strings, just letters and no special characteres
  // year should be 1-5 and also number
  // middle name should be a string and 1 letter

  async function handleAddStudent()
  {
      const studentData = 
      {
        IdNumber,
        FirstName,
        LastName,
        MiddleName,
        Course,
        Year,
      }

      try
    {
      const response = await fetch("http://localhost:1337/addStudent", 
      {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      const result = await response.json()

      if(result.success)
      {
        setIdNumber("");
        setFirstName("");
        setLastName("");
        setMiddleName("");
        setCourse("");
        setYear("");
        alert(result.message);
      }else
      {
        alert("Failed to add student. Please try again.");
      }
    }catch(error)
    {
      console.error("Error adding student:", error);
      alert("An error occured. Please try again.");
    }
  }

  

  function showStudentLog() {
    console.log("Id Number: ", IdNumber);
    console.log("First Name: ", FirstName);
    console.log("Last Name: ", LastName);
    console.log("Middle Name: ", MiddleName);
    console.log("Course: ", Course);
    console.log("Year: ", Year);
  }

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
              id="outlined-basic"
              label="ID Number"
              variant="outlined"
              value={IdNumber}
              type="number"
              onChange={(e) => setIdNumber(e.target.value)}
              onInput = {(e) =>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,8) }}
              sx={{ width: "200px" }}
            />
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ width: "200px" }}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ width: "200px" }}
            />
            <TextField
              id="outlined-basic"
              label="Middle Name"
              variant="outlined"
              value={MiddleName}
              onChange={(e) => setMiddleName(e.target.value)}
              sx={{ width: "200px" }}
            />
            <TextField
              id="outlined-basic"
              label="Course"
              variant="outlined"
              value={Course}
              onChange={(e) => setCourse(e.target.value)}
              sx={{ width: "200px" }}
            />
            <TextField
              id="outlined-basic"
              label="Year"
              variant="outlined"
              value={Year}
              onChange={(e) => setYear(e.target.value)}
              sx={{ width: "200px" }}
            />

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
