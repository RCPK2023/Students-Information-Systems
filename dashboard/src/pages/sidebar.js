import { Box, Container, Typography, Button } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';

import "./sidebar.css";

const Sidebar = () => {

  function clearCredentials(){
    localStorage.clear();
  }

  const userType = localStorage.getItem('type');

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

        {userType === 'User' && (
          <>
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
          </>
        )}

        {userType === 'User' && (
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
        )}

      {userType === 'User' && (
            <Box>
          <Button
            href="/ManageStudents"
            variant="text"
            startIcon={<PeopleIcon/>}
            id="sidebar-button"
          >
            Manage Students
          </Button>
        </Box>
      )}
        

      {userType === 'Student' && (
           <Box>
           <Button
             href="/StudentDashboard"
             variant="text"
             startIcon={<PeopleIcon/>}
             id="sidebar-button"
           >
             View Student Account
           </Button>
         </Box>
      )}
        <Box>
          <Button
            onClick={clearCredentials} 
            href="/login"
            variant="text"
            startIcon={<PeopleIcon/>}
            id="sidebar-button"
          >
            Log out
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Sidebar;
