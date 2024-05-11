import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import { Container, Grid, Typography } from '@mui/material';
import './studentDashboard.css';
import axios from 'axios';

const StudentDashboard = () => {

  const studentData = {
    IdNumber: "", 
    FirstName: "",
    LastName: "",
    MiddleName: "",
    Course: "",
    Year: "",
    Password: "",
  };
  
  studentData.IdNumber = localStorage.getItem("email");
  
  const [student, setStudent] = useState(studentData);
  
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/getStudent", { params: { id: studentData.IdNumber } });
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
  
    fetchStudentData();
  }, []);
  
    

  return (
    <div id="container">
  <Sidebar />

  <Container>

  <Typography variant="h4">Student Dashboard</Typography>


    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">IdNumber:</Typography>
        <Typography variant="body1">{student.IdNumber}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">FirstName:</Typography>
        <Typography variant="body1">{student.FirstName}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">LastName:</Typography>
        <Typography variant="body1">{student.LastName}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">MiddleName:</Typography>
        <Typography variant="body1">{student.MiddleName}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Course:</Typography>
        <Typography variant="body1">{student.Course}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Year:</Typography>
        <Typography variant="body1">{student.Year}</Typography>
      </Grid>

    </Grid>
  </Container>
</div>

  );
};

export default StudentDashboard;
