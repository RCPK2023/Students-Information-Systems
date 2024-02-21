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
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

function ViewStudent() {

  const style = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection:'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    gap: "5px"
  };

  const styleButton = {
    width: '200px',
    marginBottom: '15px'
  };

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [editableStudent, setEditableStudent] = useState();
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

    const handleOpen = (studentId) => {
      const studentToEdit = Students.find(student => student.IdNumber === studentId);
      if (studentToEdit) {
        studentToEdit.id = studentId;
        setEditableStudent(studentToEdit);
        setSelectedStudent(studentId);
        setOpen(true);
      } else {
        console.error('Selected student data not found');
      }
    }
 

  const handleClose = () => setOpen(false);

  const saveEditedStudent = () => {
    if (!editableStudent || !editableStudent.id) {
      console.error('Editable student data is missing or invalid');
      return;
    }
    const studentId = editableStudent.IdNumber;
  
    axios.put(`http://localhost:1337/updateStudent/${studentId}`, editableStudent)
      .then(response => {
        console.log('Student updated successfully:', response.data);
        setEditableStudent(null); 
        setOpen(false);
        
        axios.get('http://localhost:1337/viewStudents') 
          .then((response) => {
            setStudents(response.data);
          })
          .catch((error) => {
            console.error("Error fetching updated student data:", error);
          });
      })
      .catch(error => {
        console.error('Error updating student:', error);
      });
  };

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

                    <TextField
                    disabled
                    id="outlined-basic"
                    label="ID Number"
                    variant="outlined"
                    value={student.IdNumber}
                    sx={styleButton}/><br/>

                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      value={editableStudent?.FirstName || ''}
                      onChange={(e) => setEditableStudent(prevState => ({...prevState, FirstName: e.target.value}))}
                      sx={styleButton}
                    /><br/>

                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      value={editableStudent?.LastName || ''}
                      onChange={(e) => setEditableStudent(prevState => ({...prevState, LastName: e.target.value}))}
                      sx={styleButton}
                    /><br/>

                    <TextField
                      id="outlined-basic"
                      label="Middle Name"
                      variant="outlined"
                      value={editableStudent?.MiddleName || ''}
                      onChange={(e) => setEditableStudent(prevState => ({...prevState, MiddleName: e.target.value}))}
                      sx={styleButton}
                    /><br/>

                    <TextField
                      id="outlined-basic"
                      label="Course"
                      variant="outlined"
                      value={editableStudent?.Course || ''}
                      onChange={(e) => setEditableStudent(prevState => ({...prevState, Course: e.target.value}))}
                      sx={styleButton}
                    /><br/>

                    <TextField
                      id="outlined-basic"
                      label="Year"
                      variant="outlined"
                      value={editableStudent?.Year || ''}
                      onChange={(e) => setEditableStudent(prevState => ({...prevState, Year: e.target.value}))}
                      sx={styleButton}
                    /><br/>

                    </Typography>

                    <Box>

                    <Button variant="contained" onClick={saveEditedStudent}  sx={{ width: "100px", marginRight:'5px'}}>SAVE</Button>
                    <Button variant="contained" onClick={handleClose}  sx={{ width: "100px" }}>CLOSE</Button>

                    </Box>
                    
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
