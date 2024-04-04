import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Addstudent from "./pages/addstudent";
import Demo from "./pages/Demo";
import ViewStudent from "./pages/viewstudent";
import ViewUsers from "./pages/ViewUsers";
import Login from "./pages/login";
import axios from "axios";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const navigateToDashboard = useNavigate();

  useEffect(() => {
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
            
               navigateToDashboard('/');
            
            
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Set loading to false when login process completes
        }
      };
      loginUser();
    } else {
      setLoading(false); // If no stored email and password, set loading to false
    }
  }, []);

  const ProtectedRoutes = () => {
    console.log("What is the value before: ", isLoggedIn);
    if (loading) {
      return <div>Loading...</div>; // Render loading indicator while loading
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
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
