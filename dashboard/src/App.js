import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Addstudent from "./pages/addstudent";
import Demo from "./pages/Demo";
import ViewStudent from "./pages/viewstudent";
import ViewUsers from "./pages/ViewUsers";
import Login from "./pages/login";
import Signup from "./pages/signup";
import axios from "axios";
import ManageStudents from "./pages/ManageStudents";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    setLoading(true);
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail && storedPassword) {
      const loginUser = async () => {
        try {
          const response = await axios.post("http://localhost:1337/api/users/login", {
            email: storedEmail,
            password: storedPassword
          });
          if (response.data.message) {
            console.log("Login successful");
            setIsLoggedIn(true);
            
         
            
            
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); 
        }
      };
      loginUser();
    } else {
      setLoading(false); 
    }
  }, []);

  const ProtectedRoutes = () => {
    console.log("What is the value before: ", isLoggedIn);
    if (loading) {
      return <div>Loading...</div>; 
    }

    console.log("What is the value : ", isLoggedIn);
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addstudent" element={<Addstudent />} />
            <Route path="/viewstudent" element={<ViewStudent />} />
            <Route path="/viewusers" element={<ViewUsers />} />
            <Route path="/ManageStudents" element={<ManageStudents />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
