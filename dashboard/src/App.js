// App.js
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Addstudent from "./pages/addstudent";
import ViewStudent from "./pages/viewstudent";
import ViewUsers from "./pages/ViewUsers";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ManageStudents from "./pages/ManageStudents";
import StudentDashboard from "./pages/studentDashboard";
import ProtectedRoutes from "./pages/protectedroute";


const App = () => {

  return (
    <div>
     <BrowserRouter>
    <Routes>
        <Route path="/" element={<ProtectedRoutes allowedRoles={['Student', 'User']}><Dashboard /></ProtectedRoutes>} />
        <Route path="/addstudent" element={<ProtectedRoutes allowedRoles={['User']}><Addstudent /></ProtectedRoutes>} />
        <Route path="/viewstudent" element={<ProtectedRoutes allowedRoles={['User']}><ViewStudent /></ProtectedRoutes>} />
        <Route path="/viewusers" element={<ProtectedRoutes allowedRoles={['User']}><ViewUsers /></ProtectedRoutes>} />
        <Route path="/ManageStudents" element={<ProtectedRoutes allowedRoles={['User']}><ManageStudents /></ProtectedRoutes>} />
        <Route path="/studentDashboard" element={<ProtectedRoutes allowedRoles={['Student']}><StudentDashboard /></ProtectedRoutes>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
</BrowserRouter>
    </div>
  );
};

export default App;
