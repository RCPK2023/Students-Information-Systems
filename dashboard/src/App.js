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
import ProtectedRoutes from "./pages/protectedroute";

const App = () => {

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
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
