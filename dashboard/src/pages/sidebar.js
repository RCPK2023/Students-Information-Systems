import { Box, Container, Typography, Button } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './sidebar.css';

const sidebar = () => {
  return (
    <div id='container'>
        
      <Container id='form-container-for-sidebar'>
        <Box>
            <Button href='/' variant="text" startIcon={<HomeIcon />} id='sidebar-button'>
            Home
            </Button>
        </Box>

        <Box>
            <Button href='/addstudent' variant="text" startIcon={<ErrorOutlineIcon />} id='sidebar-button'>
            Add Student
            </Button>
        </Box>
      
      </Container>
    </div>
  )
}

export default sidebar
