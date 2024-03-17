import { Box, Container, Typography, Button } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';

import "./sidebar.css";

const sidebar = () => {
  return (
    <div id="container">
      <Container id="form-container-for-sidebar">
        <Box>
          <Button
            href="/"
            variant="text"
            startIcon={<HomeIcon />}
            id="sidebar-button"
          >
            Home
          </Button>
        </Box>

        <Box>
          <Button
            href="/addstudent"
            variant="text"
            startIcon={<PersonAddIcon />}
            id="sidebar-button"
          >
            Add Student
          </Button>
        </Box>

        <Box>
          <Button
            href="/viewstudent"
            variant="text"
            startIcon={<AccountCircleIcon />}
            id="sidebar-button"
          >
            View Students
          </Button>
        </Box>

        <Box>
          <Button
            href="/ViewUsers"
            variant="text"
            startIcon={<PeopleIcon/>}
            id="sidebar-button"
          >
            View Users
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default sidebar;
