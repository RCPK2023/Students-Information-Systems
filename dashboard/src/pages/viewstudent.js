import React, { useEffect, useState } from 'react'
import "./viewstudent.css";
import Sidebar from './sidebar';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Modal, Typography } from '@mui/material';

function ViewStudent() {
  

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (StudentId) => {
    setSelectedStudent(StudentId);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const [Students, setStudents] = useState([]);

    useEffect(() => 
    {
        axios
        .get('http://localhost:1337/viewStudents') 
        .then((response) =>
        {
            setStudents(response.data);
        })
        .catch((error) => {
            console.error("Error fetching student data:", error);
        });       
    }, []);

  return (
    <div id='container'>
      <Sidebar></Sidebar>

      <div className='view-container'>
        <TableContainer component={Paper}>
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
            {Students.map((student) => (
              <TableRow
                key={student.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{student.IdNumber}</TableCell>
                <TableCell align="right">{student.FirstName}</TableCell>
                <TableCell align="right">{student.LastName}</TableCell>
                <TableCell align="right">{student.MiddleName}</TableCell>
                <TableCell align="right">{student.Course}</TableCell>
                <TableCell align="right">{student.Year}</TableCell>
                <TableCell>
                <Button align="right" variant="contained" onClick={() => handleOpen(student.IdNumber)}>EDIT</Button>
                  <Modal
                  open={open && selectedStudent === student.IdNumber}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Student Information
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2}}>
                      ID Number: {student.IdNumber}<br/>
                      First Name: {student.FirstName}<br/>
                      Last Name: {student.LastName}<br/>
                      Middle Name:{student.MiddleName}<br/>
                      Course: {student.Course}<br/>
                      Year: {student.Year}<br/>
                    </Typography>
                    <Button variant="contained" onClick={handleClose}>CLOSE</Button>
                  </Box>
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  )
}

export default ViewStudent
